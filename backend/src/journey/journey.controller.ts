import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {JourneyService} from "./journey.service";
import {JourneyRequest} from "./entities/journey.request.entity";
import {Journeys, Location, Station, Stop} from "hafas-client";

/**
 * Endpoint for request regarding planning a journey.
 */
@Controller("journey")
@ApiTags("journey")
export class JourneyController {

  constructor(
    private readonly journeyService: JourneyService,
  ) {

    // journeyService.searchLocations("Wuppertal")
    //   .then(startResult => console.log(startResult))
    //   .catch(reason => console.log(reason));
    // journeyService.searchLocations("Essen Hbf")
    //   .then(destinationResult => console.log(destinationResult))
    //   .catch(reason => console.log(reason));
    //
    // const journey: JourneyRequest = new JourneyRequest();
    // journey.from = "8000266";
    // journey.to = "8000098";
    // journeyService.planJourney(journey)
    //   .then(journeyResult => console.log(journeyResult.journeys[0]))
    //   .catch(reason => console.log(reason));
  }

  @Post()
  @ApiOperation({summary: "Plan a journey."})
  @ApiOkResponse({description: "Planned journeys."})
  planJourney(@Body() journeyRequest: JourneyRequest): Promise<Journeys> {

    return this.journeyService
      .planJourney(journeyRequest);
  }

  @Get("location/:query")
  @ApiOperation({summary: "Search a location with the given query."})
  @ApiOkResponse({description: "Location results for query."})
  searchLocation(@Param("query") locationQuery: string): Promise<ReadonlyArray<Station | Stop | Location>> {

    return this.journeyService
      .searchLocations(locationQuery);
  }


}
