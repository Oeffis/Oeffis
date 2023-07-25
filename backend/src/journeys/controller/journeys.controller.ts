import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RefreshJourneyNotAvailable } from "../../app/entity/refreshjourneysnotavailable.entity";
import { PlanJourneyDto } from "../dto/journey.parameters.dto";
import { JourneyLocation } from "../entities/journey.location.entity";
import { JourneyVariant } from "../entities/journey.variant.entity";
import { JourneysService } from "../service/journeys.service";

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
    summary: "Returns variants of planned journey.",
    description: "Plan variants of a journey."
  })
  @ApiOkResponse({
    description: "Returns variants of planned journey.",
    type: [JourneyVariant]
  })
  async planJourney(@Body() journeyParameters: PlanJourneyDto): Promise<JourneyVariant[]> {

    return this.journeyService
      .planJourney(journeyParameters);
  }

  @Get("refresh/:token")
  @ApiOperation({
    summary: "Returns refreshed data of a journey variant.",
    description: "Refresh (receive updated data of) a journey variant that has been planned before."
  })
  @ApiOkResponse({
    description: "Returns refreshed journey variant.",
    type: JourneyVariant
  })
  @ApiBadRequestResponse({
    description: "Refreshing journey variant is not available with endpoint being used.",
    type: RefreshJourneyNotAvailable
  })
  async refreshJourney(@Param("token") refreshToken: string): Promise<JourneyVariant> {

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
    type: [JourneyLocation]
  })
  async searchLocation(@Param("query") locationQuery: string): Promise<JourneyLocation[]> {

    return this.journeyService
      .searchLocations(locationQuery);
  }

}
