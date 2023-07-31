import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequest } from "app/entity/badrequest.entity";
import { StopFinderAtCoordinatesParametersDto, StopFinderAtCoordinatesResponseDto } from "stop_finder/dto/stop_finder.at_coordinates";
import { StopFinderByNameParametersDto, StopFinderByNameResponseDto } from "stop_finder/dto/stop_finder.by_name.dto";
import { StopFinderService } from "../service/stop_finder.service";

@Controller("stop_finder")
@ApiTags("stop_finder")
export class StopFinderController {
  constructor(private readonly stopFinderService: StopFinderService) { }

  @Post("at_coordinates")
  @ApiOperation({
    summary: "finds a stop at given coordinates"
  })
  @ApiOkResponse({
    description: "Returns the found stops.",
    type: StopFinderAtCoordinatesResponseDto
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findStopsAtCoordinates(@Body() query: StopFinderAtCoordinatesParametersDto): Promise<StopFinderAtCoordinatesResponseDto> {
    return this.stopFinderService.findStopsAtLocation(query);
  }

  @Post("by_name")
  @ApiOperation({
    summary: "finds a stop by name"
  })
  @ApiOkResponse({
    description: "Returns the found stops.",
    type: StopFinderByNameResponseDto
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findStopByName(@Body() query: StopFinderByNameParametersDto): Promise<StopFinderByNameResponseDto> {
    return this.stopFinderService.findStopByName(query);
  }
}
