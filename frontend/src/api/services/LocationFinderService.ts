/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Location } from '../models/Location';
import type { LocationCoordinatesDto } from '../models/LocationCoordinatesDto';
import type { LocationNameDto } from '../models/LocationNameDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LocationFinderService {

  /**
   * finds a stop at given coordinates
   * @param requestBody 
   * @returns Location Returns the found locations.
   * @throws ApiError
   */
  public static locationFinderControllerFindStopsAtCoordinates(
requestBody: LocationCoordinatesDto,
): CancelablePromise<Array<Location>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/location_finder/at_coordinates',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request.`,
      },
    });
  }

  /**
   * finds a stop by name
   * @param requestBody 
   * @returns Location Returns the found locations.
   * @throws ApiError
   */
  public static locationFinderControllerFindStopByName(
requestBody: LocationNameDto,
): CancelablePromise<Array<Location>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/location_finder/by_name',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request.`,
      },
    });
  }

}
