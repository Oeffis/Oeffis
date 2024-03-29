/* eslint-disable @typescript-eslint/naming-convention */
import { VrrClientBase, warpAsFailSafeSchemaConverter } from "./VrrClientBase";
import { Convert, LOCATIONSUGGESTSchema } from "./vendor/VrrApiTypes";

export interface FindStopAtCoordinatesParameters {
  latitude: number;
  longitude: number;
}

export interface FindStopByNameOrIdParameters {
  search: string;
  disableProprietaryVrrParameters?: boolean;
  limit?: number;
}

export class StopFinderClient extends VrrClientBase {
  public async findStopAtCoordinates(
    query: FindStopAtCoordinatesParameters,
  ): Promise<LOCATIONSUGGESTSchema> {
    const formattedCoordinates = this.formatCoordinates(
      query.latitude,
      query.longitude,
    );

    return this.executeFetchRequest(
      "/XML_STOPFINDER_REQUEST",
      {
        name_sf: formattedCoordinates,
        type_sf: "coord"
      },
      warpAsFailSafeSchemaConverter(Convert.toLOCATIONSUGGESTSchema),
    );
  }

  public async findStopByNameOrId(
    query: FindStopByNameOrIdParameters,
  ): Promise<LOCATIONSUGGESTSchema> {
    const proprietaryVrrParameters = this.perpareDisableProprietaryVrrParametersOption(query);

    return this.executeFetchRequest(
      "/XML_STOPFINDER_REQUEST",
      {
        name_sf: query.search,
        type_sf: "any",
        ...(query.limit ? { anyMaxSizeHitList: query.limit + "" } : {}),
        ...proprietaryVrrParameters
      },
      warpAsFailSafeSchemaConverter(Convert.toLOCATIONSUGGESTSchema),
    );
  }

  /**
   * Formats the coordinates to the format expected by the VRR API.
   *
   * @param latitude The latitude of the location. e.g. 51.231000
   * @param longitude The longitude of the location. e.g. 6.787835
   */
  private formatCoordinates(latitude: number, longitude: number): string {
    if (latitude < 0 || longitude < 0) {
      throw new Error("Coordinates must be positive");
    }

    if (latitude > 90) {
      throw new Error("Latitude must be less than 90");
    }

    if (longitude > 180) {
      throw new Error("Longitude must be less than 180");
    }

    // If I am not mistaken, the VRR API expects the coordinates with the
    // longitude first. Unlike the rest of the world, which uses latitude first.

    return `${longitude.toFixed(5)}:${latitude.toFixed(5)}:WGS84[dd.ddddd]`;
  }

  private perpareDisableProprietaryVrrParametersOption({ disableProprietaryVrrParameters }: FindStopByNameOrIdParameters): Record<string, string> {
    if (disableProprietaryVrrParameters) {
      return {};
    }

    return {
      convertAddressesITKernel2LocationServer: "1",
      convertCoord2LocationServer: "1",
      convertCrossingsITKernel2LocationServer: "1",
      convertPOIsITKernel2LocationServer: "1",
      convertStopsPTKernel2LocationServer: "1",
      coordOutputFormat: "WGS84[dd.ddddd]",
      doNotSearchForStops_sf: "1",
      language: "de",
      locationInfoActive: "1",
      locationServerActive: "1",
      serverInfo: "1",
      sl3plusStopFinderMacro: "trip",
      vrrStopFinderMacro: "1"
    };
  }
}
