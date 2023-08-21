import { Injectable } from "@nestjs/common";
import { StopFinderClient } from "@oeffis/vrr_client";
import { StopFinderAtCoordinatesParametersDto, StopFinderAtCoordinatesResponseDto } from "stop_finder/dto/stop_finder.at_coordinates";
import { StopFinderByNameParametersDto, StopFinderByNameResponseDto } from "stop_finder/dto/stop_finder.by_name.dto";
import { ApiService } from "../../vrr/service/api.service";

@Injectable()
export class StopFinderService {

  private readonly stopFinder: StopFinderClient;

  constructor(
    apiService: ApiService
  ) {
    this.stopFinder = apiService.getInstanceOf(StopFinderClient);
  }

  async findStopsAtLocation(query: StopFinderAtCoordinatesParametersDto): Promise<StopFinderAtCoordinatesResponseDto> {
    const response = await this.stopFinder.findStopAtCoordinates({
      latitude: query.latitude,
      longitude: query.longitude
    });

    return {
      stops: response.locations?.map(location => ({
        id: location.id ?? "??",
        name: location.name ?? "??",
        latitude: location.latitude ?? 0,
        longitude: location.longitude ?? 0
      })) ?? []
    };
  }

  async findStopByName(query: StopFinderByNameParametersDto): Promise<StopFinderByNameResponseDto> {
    const response = await this.stopFinder.findStopByName({
      search: query.name
    });

    return {
      stops: response.locations?.map(location => ({
        id: location.id ?? "??",
        name: location.name ?? "??",
        latitude: (location.coord?.[0] as number) ?? 0,
        longitude: (location.coord?.[1] as number) ?? 0
      })) ?? []
    };
  }
}
