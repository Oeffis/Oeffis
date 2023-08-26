import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequest } from "app/entity/badrequest.entity";
import { JourneyService } from "../service/journey.service";
import { Journey } from "journey/entity/journey.entity";
import { JourneyRequestDto } from "journey/dto/journeyRequest.dto";

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
  public queryTrip(@Body() requestBody: JourneyRequestDto): Promise<Journey[]> {
    return this.journeyService.queryTrip(requestBody.originId, requestBody.destinationId/*, requestBody.departure*/);
  }
}
