import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client/dist/Constants";
import { DeparturesClient } from "@oeffis/vrr_client/dist/DeparturesClient";

export async function run(args: { stopId: string, limit: number }): Promise<void> {
  const departures = await new DeparturesClient(VRR_TEST_API_BASE_URL)
    .findDeparturesByStop(args);

  const mappedStops = departures.stopEvents?.map(stop => {
    let delay = "unknown";

    if (stop.departureTimeEstimated) {
      delay = (new Date(stop.departureTimeEstimated || "").getTime() - new Date(stop.departureTimePlanned || "").getTime()) / 1000 / 60 + "m";
    }

    return ({
      planned: stop.departureTimePlanned,
      delay,
      name: stop.transportation.name,
      destination: stop.transportation.destination?.name
    });
  });
  console.table(mappedStops);
}
