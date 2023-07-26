import { VRR_TEST_API_BASE_URL } from "./Constants";
import { VrrClientBase } from "./VrrClientBase";
import { Convert, LOCATIONSUGGESTSchema } from "./vendor/VrrApiTypes";

export type FindStopAtCoordinatesParameters = {
  latitude: number;
  longitude: number;
};

export type FindStopByNameParameters = {
  search: string;
};

export class StopFinderClient extends VrrClientBase {

  public async findStopAtCoordinates(query: FindStopAtCoordinatesParameters): Promise<LOCATIONSUGGESTSchema> {
    const formattedCoordinates = this.formatCoordinates(query.latitude, query.longitude);

    return this.executeFetchRequest('/static03/XML_STOPFINDER_REQUEST', {
      name_sf: formattedCoordinates,
      type_sf: 'coord',
    }, Convert.toLOCATIONSUGGESTSchema);
  }

  public async findStopByName(query: FindStopByNameParameters): Promise<LOCATIONSUGGESTSchema> {
    return this.executeFetchRequest('/static03/XML_STOPFINDER_REQUEST', {
      name_sf: query.search,
      type_sf: 'any',
    }, Convert.toLOCATIONSUGGESTSchema);
  }

  /**
   * Formats the coordinates to the format expected by the VRR API.
   *
   * @param latitude The latitude of the location. e.g. 51.231000
   * @param longitude The longitude of the location. e.g. 6.787835
   */
  private formatCoordinates(latitude: number, longitude: number): string {
    if (latitude < 0 || longitude < 0) {
      throw new Error('Coordinates must be positive');
    }

    if (latitude > 90) {
      throw new Error('Latitude must be less than 90');
    }

    if (longitude > 180) {
      throw new Error('Longitude must be less than 180');
    }

    // If I am not mistaken, the VRR API expects the coordinates with the
    // longitude first. Unlike the rest of the world, which uses latitude first.

    return `${longitude.toFixed(5)}:${latitude.toFixed(5)}:WGS84[dd.ddddd]`;
  }
}
