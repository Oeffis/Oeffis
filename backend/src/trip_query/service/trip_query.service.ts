import { Injectable } from "@nestjs/common";
import { TripRequestClient, VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client";
import { TripQueryResponseDto } from "trip_query/dto/tripQueryResponse";
import { VrrJourneysWrapperService } from "./VrrJourneysWrapper.service";
import { Journey } from "trip_query/entity/Journey.entity";
import { ApiService } from "../../vrr/service/api.service";

@Injectable()
export class TripQueryService {
  private readonly tripRequestClient: TripRequestClient;
  private readonly journeysWrapper: VrrJourneysWrapperService;

  public constructor(
    apiService: ApiService
  ) {
    this.tripRequestClient = apiService.getInstanceOf(TripRequestClient);
    this.journeysWrapper = new VrrJourneysWrapperService();
  }

  public async queryTrip(origin: string, destination: string): Promise<Journey[]> {
    const client = new TripRequestClient(VRR_TEST_API_BASE_URL);
    const result = await client.queryTrip({
        originPointId: origin,
        destinationPointId: destination
    });

    return this.journeysWrapper.wrap(response.journeys ?? []);
  }



}
