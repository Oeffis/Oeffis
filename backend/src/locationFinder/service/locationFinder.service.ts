import { Inject, Injectable } from "@nestjs/common";
import { StopFinderClient } from "@oeffis/vrr_client";
import {
  FindStopAtCoordinatesParameters,
  FindStopByNameOrIdParameters
} from "@oeffis/vrr_client/dist/StopFinderClient";
import { Location as VrrLocation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { LocationCoordinatesDto } from "locationFinder/dto/locationCoordinates.dto";
import { LocationNameDto } from "locationFinder/dto/locationName.dto";
import { ApiService } from "vrr/service/api.service";
import { LocationWithAssignedStops, RatedLocation } from "../entity/location.entity";
import { LocationMapperService } from "./mapper/locationMapper.service";

@Injectable()
export class LocationFinderService {

  private readonly locationFinder: StopFinderClient;
  private readonly locationMapper: LocationMapperService;

  constructor(
    @Inject(LocationMapperService) locationWrapper: LocationMapperService,
    @Inject(ApiService) apiService: ApiService
  ) {
    this.locationFinder = apiService.getInstanceOf(StopFinderClient);
    this.locationMapper = locationWrapper;
  }

  async findLocationsByCoordinates(query: LocationCoordinatesDto): Promise<LocationWithAssignedStops> {
    const queryParams: FindStopAtCoordinatesParameters = {
      latitude: query.latitude,
      longitude: query.longitude
    };

    const response = await this.locationFinder.findStopAtCoordinates(queryParams);
    // There should be exactly one location for given coordinates.
    if (!response.locations || response.locations.length !== 1 || !response.locations[0]) {
      throw Error("There should be exactly one found location for given coordinates, but there is none.");
    }
    const coordsLocation: VrrLocation = response.locations[0];

    return this.locationMapper.mapVrrLocationWithAssignedStops(coordsLocation);
  }

  async findLocationsByName(query: LocationNameDto): Promise<RatedLocation[]> {
    const queryParams: FindStopByNameOrIdParameters = {
      search: query.name,
      limit: query.limit
    };

    const response = await this.locationFinder.findStopByNameOrId(queryParams);
    // If locations in response is undefined, it is treated like an empty query result.
    const foundLocations: VrrLocation[] = response.locations ?? [];

    return this.locationMapper.mapRatedVrrLocations(foundLocations);
  }

  async findLocationIdsByNameOrId(query: LocationNameDto): Promise<string[]> {
    const queryParams: FindStopByNameOrIdParameters = {
      search: query.name,
      limit: query.limit
    };

    const response = await this.locationFinder.findStopByNameOrId(queryParams);
    // If locations in response is undefined, it is treated like an empty query result.
    const foundLocations: VrrLocation[] = response.locations ?? [];

    return foundLocations
      .filter(location => location.id)
      .map(location => location.id) as string[];
  }

}
