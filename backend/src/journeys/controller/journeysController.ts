import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiMethodNotAllowedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Journeys, JourneyWithRealtimeData } from "hafas-client";
import { RefreshJourneyNotAvailable } from "../../app/entity/refreshjourneysnotavailable";
import { JourneysRequest } from "../entities/journeys.request.entity";
import { JourneysService, Locations } from "../service/journeys.service";

/**
 * Endpoint for request regarding planning a journey.
 */
@Controller("journeys")
@ApiTags("journeys")
export class JourneysController {

  constructor(
    private readonly journeyService: JourneysService,
  ) { }

  @Post()
  @ApiOperation({
    summary: "Returns planned journeys.",
    description: "Plan a journey."
  })
  @ApiOkResponse({
    description: "Returns planned journeys.",
  })
  planJourney(@Body() journeyRequest: JourneysRequest): Promise<Journeys> {

    return this.journeyService
      .planJourney(journeyRequest);
  }

  @Get("refresh/:token")
  @ApiOperation({
    summary: "Returns refreshed data of a journey.",
    description: "Refresh (receive updated data of) a journey that has been planned before."
  })
  @ApiOkResponse({
    description: "Returns refreshed journey.",
  })
  @ApiBadRequestResponse({
    description: "Refreshing journey is not available with used API.",
    type: RefreshJourneyNotAvailable
  })
  refreshJourney(@Param("token") refreshToken: string): Promise<JourneyWithRealtimeData> {

    return this.journeyService
      .refreshJourney(refreshToken);
  }

  @Get("location/:query")
  @ApiOperation({
    summary: "Returns all locations matching the given query.",
    description: "Search a location with the given query."
  })
  @ApiOkResponse({
    description: "Returns location results.",
  })
  searchLocation(@Param("query") locationQuery: string): Promise<Locations> {

    return this.journeyService
      .searchLocations(locationQuery);
  }

}
