import { Injectable } from "@nestjs/common";
import { StopFinderClient, VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client";
import { LocationCoordinatesDto } from "locationFinder/dto/locationCoordinates.dto";
import { LocationNameDto } from "locationFinder/dto/locationName.dto";
import { Location } from "../entity/location.entity";
import { VrrLocationWrapperService } from "./vrrLocationWrapper.service";

@Injectable()
export class LocationFinderService {

  private readonly locationFinder: StopFinderClient;
  private readonly locationWrapper: VrrLocationWrapperService;

  constructor() {
    this.locationFinder = new StopFinderClient(VRR_TEST_API_BASE_URL);
    this.locationWrapper = new VrrLocationWrapperService();
  }

  async findLocationsByCoordinates(query: LocationCoordinatesDto): Promise<Location[]> {
    const response = await this.locationFinder.findStopAtCoordinates({
      latitude: query.latitude,
      longitude: query.longitude
    });

    return this.locationWrapper.wrap(response.locations ?? []);
  }

  async findLocationsByName(query: LocationNameDto): Promise<Location[]> {
    const response = await this.locationFinder.findStopByName({
      search: query.name
    });

    return this.locationWrapper.wrap(response.locations ?? []);
  }

}
