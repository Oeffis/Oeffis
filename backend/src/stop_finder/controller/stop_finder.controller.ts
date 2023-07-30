import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiOperation, ApiBadRequestResponse } from "@nestjs/swagger";
import { StopFinderService } from "../service/stop_finder.service";
import { BadRequest } from "app/entity/badrequest.entity";
import { StopFinderAtCoordinatesParametersDto, StopFinderAtCoordinatesResponseDto } from "stop_finder/dto/stop_finder.at_cooridinates.dto";

@Controller("stop_finder")
@ApiTags("stop_finder")
export class StopFinderController {
  constructor(private readonly stopFinderService: StopFinderService) { }

  @Post()
  @ApiOperation({
    summary: "returns a \"Hello World!\" message",
    description: "Test enpoint to send a \"Hello World!\" message to frontend."
  })
  @ApiOkResponse({
    description: "Returns a \"Hello World!\" message.",
    type: StopFinderAtCoordinatesResponseDto,

  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest,

  })
  async findStopsAtCoordinates(@Body() query: StopFinderAtCoordinatesParametersDto): Promise<StopFinderAtCoordinatesResponseDto> {
    return this.stopFinderService.findStopsAtLocation(query);
  }
}
