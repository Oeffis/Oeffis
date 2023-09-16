import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client/dist/Constants";
import { DeparturesClient } from "@oeffis/vrr_client/dist/DeparturesClient";

export async function run(args: { stopId: string, limit: number }): Promise<void> {
  const departures = await new DeparturesClient(VRR_TEST_API_BASE_URL)
    .findDeparturesByStop(args);
  console.dir(departures.stopEvents?.length);
}
