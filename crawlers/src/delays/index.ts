import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client/dist/Constants";
import { DeparturesClient } from "@oeffis/vrr_client/dist/DeparturesClient";
import { SCHEMA_CONVERTER_CONFIG, SystemMessageError } from "@oeffis/vrr_client/dist/VrrClientBase";
import { StopEvent } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import * as BetterQueue from "better-queue";
import { addSeconds, differenceInSeconds, formatDuration, intervalToDuration } from "date-fns";
import { WithPgConnection, createPgPool } from "../postgres/createPgPool";

export async function run(args: { stopId?: string, limit: number, storeRawData: boolean, concurrency: number }): Promise<void> {
  SCHEMA_CONVERTER_CONFIG.logSchemaErrors = false;

  const pgPool = await createPgPool({
    host: process.env.pgHost,
    port: parseInt(process.env.pgPort ?? "5432"),
    database: process.env.pgDatabase ?? "postgres",
    user: process.env.pgUser ?? "postgres",
    password: process.env.pgPassword ?? "postgres"
  }, console.log);

  const vrrTimetableVersionId = await getLatestVrrTimetableVersionId(pgPool.withPgConnection);
  console.log("latest vrr timetable version id", vrrTimetableVersionId);

  const stopIds = args.stopId ? [args.stopId] : await getStopIdsFromDb(pgPool.withPgConnection, vrrTimetableVersionId);
  console.log("found", stopIds.length, "definitive stop ids");

  const processingQueue = new BetterQueue({
    maxTimeout: 5 * 60 * 1000, // 5 minutes
    maxRetries: 3,
    retryDelay: 1 * 60 * 1000, // 1 minute
    process: (task: { id: string }, cb) => {
      processOneStopId(args.limit, args.storeRawData, task.id, vrrTimetableVersionId, pgPool.withPgConnection)
        .then(() => cb(null))
        .catch(cb);
    },
    concurrent: args.concurrency
  });

  for (const stopId of stopIds) {
    processingQueue.push({ id: stopId });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processingQueue.on("task_failed", (taskId: any, err: any, stats: any) => {
    console.error("task failed", { taskId, err, stats });
  });

  const startTime = new Date();
  const timer = setInterval(() => {
    const finished = processingQueue.getStats().total;

    if (finished === 0) {
      console.log("no stops finished yet, skipping progress report");
      return;
    }

    const total = stopIds.length;
    const remaining = total - finished;

    const elapsedInSeconds = differenceInSeconds(new Date(), startTime);
    const remainingTime = elapsedInSeconds / finished * remaining;
    const remainingDuration = intervalToDuration({
      start: new Date(),
      end: addSeconds(new Date(), remainingTime)
    });

    const formattedRemainingTime = formatDuration(remainingDuration);
    console.log(`Finished ${finished} of ${total} stops. ${remaining} remaining. ${formattedRemainingTime} remaining`);

    const totalSeconds = secondsGetDepartureDelays + secondsInsertDepartureDelaysIntoDb;
    const percentGetDepartureDelays = secondsGetDepartureDelays / totalSeconds * 100;
    const percentInsertDepartureDelaysIntoDb = secondsInsertDepartureDelaysIntoDb / totalSeconds * 100;

    console.log(`getDepartureDelays: ${secondsGetDepartureDelays.toFixed(2)}s (${percentGetDepartureDelays.toFixed(2)}%)`, `insertDepartureDelaysIntoDb: ${secondsInsertDepartureDelaysIntoDb.toFixed(2)}s (${percentInsertDepartureDelaysIntoDb.toFixed(2)}%)`);

    if (elapsedInSeconds > 2 * 60 * 60) {
      console.log("Exitting after 2 hours of processing.");
      process.exit(1);
    }
  }, 5_000);

  await promiseOfQueueDrained(processingQueue);
  clearInterval(timer);

  await pgPool.closePgConnection();
}

let secondsGetDepartureDelays = 0;
let secondsInsertDepartureDelaysIntoDb = 0;

async function processOneStopId(limit: number, storeRawData: boolean, stopId: string, vrrTimetableVersionId: number, withPgConnection: WithPgConnection): Promise<void> {
  const recordingTime = new Date();

  const getDepartureDelaysStart = new Date();
  const stopEvents = await getDepartureDelays(stopId, limit);
  secondsGetDepartureDelays += differenceInSeconds(new Date(), getDepartureDelaysStart);

  if (stopEvents.length === 0) {
    console.warn("No stop events found for stop ", stopId);
  }

  const insertDepartureDelaysIntoDbStart = new Date();
  await insertDepartureDelaysIntoDb(
    storeRawData,
    stopEvents,
    withPgConnection,
    recordingTime,
    vrrTimetableVersionId,
    stopId,
  );
  secondsInsertDepartureDelaysIntoDb += differenceInSeconds(new Date(), insertDepartureDelaysIntoDbStart);
}

async function getStopIdsFromDb(withPgConnection: WithPgConnection, vrrTimetableVersionId: number): Promise<string[]> {
  return withPgConnection(async pgClient => {
    const stops = await pgClient.query(`
    WITH RECURSIVE ParentHierarchy AS (
      SELECT stop_id, parent_station
      FROM stops
      WHERE stop_id IN (
        SELECT DISTINCT stop_id FROM stop_times WHERE vrr_timetable_version_id = $1
      )
      UNION
      SELECT t.stop_id, t.parent_station
      FROM stops t
      INNER JOIN ParentHierarchy ph ON t.stop_id = ph.parent_station
    ),
    valid_stops AS (
        SELECT stop_id FROM ParentHierarchy WHERE parent_station IS NULL
    )

    SELECT DISTINCT "NVBW_HST_DHID"
    FROM stops
    WHERE "NVBW_HST_DHID" LIKE 'de:%' AND
      stop_id IN (
        SELECT stop_id FROM valid_stops
      )`, [vrrTimetableVersionId]);

    if (stops.rowCount === 0) {
      return Promise.reject(new Error("no stops with stop times found in DB"));
    }

    return stops.rows.map(row => row.NVBW_HST_DHID);
  });
}

async function getLatestVrrTimetableVersionId(withPgConnection: WithPgConnection): Promise<number> {
  return withPgConnection(async pgClient => {
    const result = await pgClient.query("SELECT max(vrr_timetable_version_id) as id FROM vrr_timetable_version");
    if (result.rowCount === 0) {
      throw new Error("no vrr timetable versions found in DB");
    }
    return result.rows[0].id;
  });
}

async function getDepartureDelays(stopId: string, limit: number): Promise<StopEvent[]> {
  try {
    const departures = await new DeparturesClient(VRR_TEST_API_BASE_URL)
      .findDeparturesByStop({ stopId, limit });

    const departureEvents = departures.stopEvents ?? [];
    return departureEvents;

  } catch (e) {
    if (e instanceof SystemMessageError) {
      const ignored = [
        "no matching departure found",
        "no serving lines found"
      ];

      if (e.systemMessages.length === 1) {
        const messageText = e.systemMessages[0].text;
        if (typeof messageText === "string" && ignored.includes(messageText)) {
          return [];
        }
      }
    }

    throw e;
  }
}

async function insertDepartureDelaysIntoDb(
  storeRawData: boolean,
  stopEvents: StopEvent[],
  withPgConnection: WithPgConnection,
  recordingTime: Date,
  vrrTimetableVersionId: number,
  parentStopId: string,
): Promise<void> {
  await withPgConnection(async pgClient => {
    const promises = stopEvents.map(stop => {
      const rawData = storeRawData ? JSON.stringify(stop) : null;
      return pgClient.query("INSERT INTO historic_data (trip_id, stop_id, recording_time, is_departure, planned, estimated, raw_data, vrr_timetable_version_id, trip_code, parent_stop_id, is_cancelled) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [
        stop.transportation.id,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        stop.location!.id,
        recordingTime,
        true,
        stop.departureTimePlanned,
        stop.departureTimeEstimated,
        rawData,
        vrrTimetableVersionId,
        stop.transportation.properties?.tripCode,
        parentStopId,
        (stop as { isCancelled?: boolean }).isCancelled ?? false
      ]);
    });

    await Promise.all(promises);
  });
}

function promiseOfQueueDrained(queue: BetterQueue): Promise<void> {
  return new Promise((resolve, reject) => {
    queue.once("drain", () => resolve());
    queue.once("error", (err) => reject(err));
  });
}
