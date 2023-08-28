/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Journey } from '../models/Journey';
import type { JourneyRequestDto } from '../models/JourneyRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JourneyService {

  /**
   * queries a journey
   * @param requestBody 
   * @returns Journey Journeys.
   * @throws ApiError
   */
  public static journeyControllerQueryTrip(
requestBody: JourneyRequestDto,
): CancelablePromise<Array<Journey>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/journey',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request.`,
      },
    });
  }

}
