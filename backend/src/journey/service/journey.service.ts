import { Injectable } from "@nestjs/common";
import { TripRequestClient, VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client";

import { JourneyRequestDto } from "journey/dto/journeyRequest.dto";
import { Journey } from "journey/entity/journey.entity";
import { VrrJourneysWrapperService } from "./vrrJourneysWrapper.service";

@Injectable()
export class JourneyService {

  private readonly client: TripRequestClient;
  private readonly journeysWrapper: VrrJourneysWrapperService;

  constructor() {
    this.client = new TripRequestClient(VRR_TEST_API_BASE_URL);
    this.journeysWrapper = new VrrJourneysWrapperService();
  }

  public async queryJourney(journeyRequest: JourneyRequestDto): Promise<Journey[]> {
    const response = await this.client.queryTrip({
      originPointId: journeyRequest.originId,
      destinationPointId: journeyRequest.destinationId,
      plannedTime: journeyRequest.departure,
      plannedTimeIs: journeyRequest.asArrival
        ? "arrival"
        : "departure"
    });

    return this.journeysWrapper.wrap(response.journeys ?? []);
  }



}
