import { Injectable } from "@nestjs/common";
import { StopFinderClient, VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client";
import { StopFinderAtCoordinatesParametersDto, StopFinderAtCoordinatesResponseDto } from "stop_finder/dto/stop_finder.at_coordinates";
import { StopFinderByNameParametersDto, StopFinderByNameResponseDto } from "stop_finder/dto/stop_finder.by_name.dto";

@Injectable()
export class StopFinderService {

  private readonly stopFinder: StopFinderClient;

  constructor() {
    this.stopFinder = new StopFinderClient(VRR_TEST_API_BASE_URL);
  }

  async findStopsAtLocation(query: StopFinderAtCoordinatesParametersDto): Promise<StopFinderAtCoordinatesResponseDto> {
    const response = await this.stopFinder.findStopAtCoordinates({
      latitude: query.latitude,
      longitude: query.longitude
    });

    return {
      stops: response.locations?.map((location) => location.id ?? "??") ?? []
    };
  }

  async findStopByName(query: StopFinderByNameParametersDto): Promise<StopFinderByNameResponseDto> {
    const response = await this.stopFinder.findStopByName({
      search: query.name
    });

    return {
      stops: response.locations?.map((location) => location.id ?? "??") ?? []
    };
  }
}
