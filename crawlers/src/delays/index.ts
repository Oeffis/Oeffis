import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client/src/Constants";
import { DeparturesClient } from "@oeffis/vrr_client/src/DeparturesClient";
import { createPgPool } from "../postgres/createPgPool";

export async function run(args: { stopId: string, limit: number }): Promise<void> {
  const departures = await new DeparturesClient(VRR_TEST_API_BASE_URL)
    .findDeparturesByStop(args);
  const stopEvents = departures.stopEvents;

  if (stopEvents === undefined || stopEvents.length === 0) {
    console.warn("no stop events found");
    return;
  }

  const pgPool = await createPgPool({
    host: process.env.pgHost,
    database: process.env.pgDatabase,
    user: process.env.pgUser,
    password: process.env.pgPassword
  }, () => { /* do nothing */ });

  await pgPool.withPgConnection(async pgClient => {
    const promises = stopEvents.map(stop =>
      pgClient.query("INSERT INTO historic_data (trip_id, stop_id, is_departure, planned, estimated, raw_data) VALUES ($1, $2, $3, $4, $5, $6)", [
        stop.transportation.id,
        args.stopId,
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
