import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client/dist/Constants";
import { DeparturesClient } from "@oeffis/vrr_client/dist/DeparturesClient";
import { StopEvent } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Connection, createPgPool } from "../postgres/createPgPool";

export async function run(args: { stopId?: string, limit: number }): Promise<void> {
  const pgPool = await createPgPool({
    host: process.env.pgHost,
    port: parseInt(process.env.pgPort ?? "5432"),
    database: process.env.pgDatabase,
    user: process.env.pgUser,
    password: process.env.pgPassword
  }, console.log);

  await pgPool.withPgConnection(async pgClient => {
    const definitiveStopId = args.stopId ?? await getStopIdFromDb(pgClient);
    console.log("fetching delays for stop id", definitiveStopId);

    const recordingTime = new Date();
    const stopEvents = await getDepartureDelays(definitiveStopId, args.limit);

    await insertDepartureDelaysIntoDb(stopEvents, pgClient, recordingTime);
  });
}

async function getStopIdFromDb(pgClient: Connection): Promise<string> {
  console.log("Fetching stop id from DB...");

  const stopIds = await pgClient.query(`
  WITH 
    counted_stops AS (
      SELECT stop_id, count(*) as count
      FROM stop_times
      GROUP BY stop_id
    ),
    selected_stop AS (
      SELECT stop_id
      FROM counted_stops
      where count > random() * 1500
      ORDER BY random() DESC
      LIMIT 1
    )
  SELECT s.stop_id, s.parent_station
  FROM selected_stop
  JOIN stops as s on selected_stop.stop_id = s.stop_id;
  `);

  if (stopIds.rowCount === 0) {
    return Promise.reject(new Error("no stops with stop times found in DB"));
  }

  if (stopIds.rows[0].parent_station !== null) {
    console.log("stop is a station, using station id instead");
    const parentStation = stopIds.rows[0].parent_station;
    return parentStation.replace("_Parent", "");
  }

  console.log("stop is a stop, using stop id");
  return stopIds.rows[0].stop_id;
}

async function getDepartureDelays(stopId: string, limit: number): Promise<StopEvent[]> {
  const departures = await new DeparturesClient(VRR_TEST_API_BASE_URL)
    .findDeparturesByStop({ stopId, limit });

  const departureEvents = departures.stopEvents ?? [];
  if (departureEvents.length === 0) {
    console.warn("no departure events found. no entries will be added to the database.");
  }

  console.log("found", departureEvents.length, "departure events");
  return departureEvents;
}

async function insertDepartureDelaysIntoDb(stopEvents: StopEvent[], pgClient: Connection, recordingTime: Date): Promise<void> {
  console.log("inserting", stopEvents.length, "departure events into DB");
  const promises = stopEvents.map(stop => pgClient.query("INSERT INTO historic_data (trip_id, stop_id, recording_time, is_departure, planned, estimated, raw_data) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
    stop.transportation.id,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    stop.location!.id,
    recordingTime,
    true,
    stop.departureTimePlanned,
    stop.departureTimeEstimated,
    JSON.stringify(stop)
  ])
  );
  const results = await Promise.allSettled(promises);
  let successCount = 0;
  results.forEach(result => {
    if (result.status === "rejected") {
      console.error("error inserting departure event into DB", result.reason);
    } else {
      successCount++;
    }
  });
  console.log("inserted", successCount, "departure events into DB,", results.length - successCount, "failed");
}
