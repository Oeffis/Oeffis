import { Inject, Injectable } from "@nestjs/common";
import { TripRequestClient } from "@oeffis/vrr_client";
import { QueryTripParameters } from "@oeffis/vrr_client/dist/TripRequestClient";
import { Journey as VrrJourney } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { HistoricDataService } from "historicData/service/historicData.service";
import { JourneyRequestDto } from "journey/dto/journeyRequest.dto";
import { Journey } from "journey/entity/journey.entity";
import { ApiService } from "vrr/service/api.service";
import { JourneyMapperService } from "./mapper/journeyMapper.service";

@Injectable()
export class JourneyService {

  private readonly client: TripRequestClient;
  private readonly journeyMapper: JourneyMapperService;
  private readonly historicDataService: HistoricDataService;

  constructor(
    @Inject(JourneyMapperService) journeyMapper: JourneyMapperService,
    @Inject(ApiService) apiService: ApiService,
    @Inject(HistoricDataService) historicDataService: HistoricDataService,
  ) {
    this.client = apiService.getInstanceOf(TripRequestClient);
    this.journeyMapper = journeyMapper;
    this.historicDataService = historicDataService;
  }

  async queryJourney(journeyRequest: JourneyRequestDto): Promise<Journey[]> {
    const queryParams: QueryTripParameters = {
      originPointId: journeyRequest.originId,
      destinationPointId: journeyRequest.destinationId,
      plannedTime: journeyRequest.departure,
      plannedTimeIs: journeyRequest.asArrival
        ? "arrival"
        : "departure"
    };

    const response = await this.client.queryTrip(queryParams);
    // If journeys in response is undefined, it is treated like an empty query result.
    const foundJourneys: VrrJourney[] = response.journeys ?? [];

    return this.journeyMapper.mapVrrJourneys(foundJourneys);
  }
}
