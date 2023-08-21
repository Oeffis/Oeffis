import { Injectable } from "@nestjs/common";
import { TripRequestClient, VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client";
import { TripQueryResponseDto } from "trip_query/dto/tripQueryResponse";
import { Stop } from "../../stop_finder/dto/stop";
import { ApiService } from "../../vrr/service/api.service";

@Injectable()
export class TripQueryService {
  private readonly tripRequestClient: TripRequestClient;

  public constructor(
    apiService: ApiService
  ) {
    this.tripRequestClient = apiService.getInstanceOf(TripRequestClient);
  }

  public async queryTrip(origin: string, destination: string): Promise<TripQueryResponseDto> {
    const client = new TripRequestClient(VRR_TEST_API_BASE_URL);
    const result = await client.queryTrip({
      originPointId: origin,
      destinationPointId: destination
    });

    return {
      alternatives: result.journeys?.map(journey => ({
        legs: journey.legs?.map(leg => ({
          origin: new Stop(leg.origin?.name ?? "??", leg.origin?.id ?? "??", (leg.origin?.coord?.[0] as number) ?? 0, (leg.origin?.coord?.[1] as number) ?? 0),
          destination: new Stop(leg.destination?.name ?? "??", leg.destination?.id ?? "??", (leg.destination?.coord?.[0] as number) ?? 0, (leg.destination?.coord?.[1] as number) ?? 0),
          name: leg.transportation?.name ? (leg.transportation.name + ` (${leg.transportation.destination?.name})`) : (leg.transportation?.product?.name || "unknown name")
        })) ?? []
      })) ?? []
    };
  }
}
