import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequest } from "../../infrastructure/entity/badrequest.entity";
import { LocationCoordinatesDto } from "../../locationFinder/dto/locationCoordinates.dto";
import { LocationNameDto } from "../../locationFinder/dto/locationName.dto";
import { Location } from "../../locationFinder/entity/location.entity";
import { LocationFinderService } from "../../locationFinder/service/locationFinder.service";

@Controller("location_finder")
@ApiTags("location_finder")
export class LocationFinderController {
  constructor(private readonly locationFinderService: LocationFinderService) { }

  @Post("at_coordinates")
  @ApiOperation({
    summary: "finds locations at given coordinates"
  })
  @ApiOkResponse({
    description: "Returns the found locations.",
    type: [Location]
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findLocationsAtCoordinates(@Body() query: LocationCoordinatesDto): Promise<Location[]> {
    return this.locationFinderService.findLocationsByCoordinates(query);
  }

  @Post("by_name")
  @ApiOperation({
    summary: "finds locations by name"
  })
  @ApiOkResponse({
    description: "Returns the found locations.",
    type: [Location]
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findLocationsByName(@Body() query: LocationNameDto): Promise<Location[]> {
    return this.locationFinderService.findLocationsByName(query);
  }
}
