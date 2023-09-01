import { Inject, Injectable } from "@nestjs/common";
import { TripRequestClient } from "@oeffis/vrr_client";

import { JourneyRequestDto } from "journey/dto/journeyRequest.dto";
import { Journey } from "journey/entity/journey.entity";
import { ApiService } from "vrr/service/api.service";
import { VrrJourneysWrapperService } from "./vrrJourneysWrapper.service";

@Injectable()
export class JourneyService {

  private readonly client: TripRequestClient;
  private readonly journeysWrapper: VrrJourneysWrapperService;

  constructor(
    @Inject(VrrJourneysWrapperService) journeysWrapper: VrrJourneysWrapperService,
    @Inject(ApiService) apiService: ApiService
  ) {
    this.client = apiService.getInstanceOf(TripRequestClient);
    this.journeysWrapper = journeysWrapper;
  }

  public async queryJourney(journeyRequest: JourneyRequestDto): Promise<Journey[]> {
    const response = await this.client.queryTrip({
      originPointId: journeyRequest.originId,
      destinationPointId: journeyRequest.destinationId,
      plannedTime: journeyRequest.departure !== undefined
        ? new Date(journeyRequest.departure)
        : undefined,
      plannedTimeIs: journeyRequest.asArrival
        ? "arrival"
        : "departure"
    });

    return this.journeysWrapper.wrap(response.journeys ?? []);
  }

}
