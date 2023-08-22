/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TripQueryRequestDto } from '../models/TripQueryRequestDto';
import type { TripQueryResponseDto } from '../models/TripQueryResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TripQueryService {

  /**
   * queries a trip
   * @param requestBody 
   * @returns TripQueryResponseDto Trip alternatives found.
   * @throws ApiError
   */
  public static tripQueryControllerQueryTrip(
requestBody: TripQueryRequestDto,
): CancelablePromise<TripQueryResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/trip_query',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request.`,
      },
    });
  }

}
