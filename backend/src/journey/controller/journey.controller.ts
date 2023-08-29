import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequest } from "app/entity/badrequest.entity";
import { JourneyRequestDto } from "journey/dto/journeyRequest.dto";
import { Journey } from "journey/entity/journey.entity";
import { JourneyService } from "../service/journey.service";

@Controller("journey")
@ApiTags("journey")
export class JourneyController {

  constructor(private readonly journeyService: JourneyService) { }

  @Post()
  @ApiOperation({
    summary: "queries a journey"
  })
  @ApiOkResponse({
    description: "Journeys.",
    type: [Journey]
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  public queryJourney(@Body() journeyRequest: JourneyRequestDto): Promise<Journey[]> {
    return this.journeyService.queryJourney(journeyRequest);
  }

}
