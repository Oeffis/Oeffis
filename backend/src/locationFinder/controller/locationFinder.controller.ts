import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequest } from "infrastructure/entity/badrequest.entity";
import { LocationCoordinatesDto } from "locationFinder/dto/locationCoordinates.dto";
import { LocationNameDto } from "locationFinder/dto/locationName.dto";
import { LocationWithAssignedStops, RatedLocation } from "../entity/location.entity";
import { LocationFinderService } from "../service/locationFinder.service";

@Controller("location_finder")
@ApiTags("location_finder")
export class LocationFinderController {
  constructor(private readonly locationFinderService: LocationFinderService) { }

  @Post("at_coordinates")
  @ApiOperation({
    summary: "finds locations at given coordinates"
  })
  @ApiOkResponse({
    description: "Location of coordinates with assigned stops.",
    type: LocationWithAssignedStops
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findLocationsAtCoordinates(@Body() query: LocationCoordinatesDto): Promise<LocationWithAssignedStops> {
    return this.locationFinderService.findLocationsByCoordinates(query);
  }

  @Post("by_name")
  @ApiOperation({
    summary: "finds locations by name"
  })
  @ApiOkResponse({
    description: "Returns the found locations.",
    type: [RatedLocation]
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findLocationsByName(@Body() query: LocationNameDto): Promise<RatedLocation[]> {
    return this.locationFinderService.findLocationsByName(query);
  }

  @Post("ids_by_name")
  @ApiOperation({
    summary: "finds location ids by name"
  })
  @ApiOkResponse({
    description: "Returns the found location ids.",
    type: [String]
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findLocationIdsByName(@Body() query: LocationNameDto): Promise<string[]> {
    return this.locationFinderService.findLocationIdsByNameOrId(query);
  }
}
