import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client/dist/Constants";
import { DeparturesClient } from "@oeffis/vrr_client/dist/DeparturesClient";
import { createPgPool } from "../postgres/createPgPool";

export async function run(args: { stopId: string, limit: number }): Promise<void> {
  const departures = await new DeparturesClient(VRR_TEST_API_BASE_URL)
    .findDeparturesByStop(args);
  const stopEvents = departures.stopEvents;
  const recordingTime = new Date();

  if (stopEvents === undefined || stopEvents.length === 0) {
    console.warn("no stop events found");
    return;
  }

  const pgPool = await createPgPool({
    host: process.env.pgHost,
    port: parseInt(process.env.pgPort || "5432"),
    database: process.env.pgDatabase,
    user: process.env.pgUser,
    password: process.env.pgPassword
  }, console.log);

  await pgPool.withPgConnection(async pgClient => {
    const promises = stopEvents.map(stop =>
      pgClient.query("INSERT INTO historic_data (trip_id, stop_id, recording_time, is_departure, planned, estimated, raw_data) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
        stop.transportation.id,
        args.stopId,
        recordingTime,
        true,
        stop.departureTimePlanned,
        stop.departureTimeEstimated,
        JSON.stringify(stop)
      ])
    );
    await Promise.all(promises || []).catch(err => {
      console.error("failed to insert some delays", err);
    });
  });
}
