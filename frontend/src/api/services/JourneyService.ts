/* istanbul ignore file */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
/* tslint:disable */
/* eslint-disable */
import type { JourneysRequest } from '../models/JourneysRequest';

export class JourneyService {

    /**
     * Returns planned journeys.
     * Plan a journey.
     * @param requestBody
     * @returns any Returns planned journeys.
     * @throws ApiError
     */
    public static journeysControllerPlanJourney(
      requestBody: JourneysRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/journey',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Returns refreshed data of a journey.
     * Refresh (receive updated data of) a journey that has been planned before.
     * @param token
     * @returns any Returns refreshed journey.
     * @throws ApiError
     */
    public static journeysControllerRefreshJourney(
      token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/journey/refresh/{token}',
            path: {
                'token': token,
            },
            errors: {
                405: `Refreshing journey is not available in given API.`,
            },
        });
    }

    /**
     * Returns all locations matching the given query.
     * Search a location with the given query.
     * @param query
     * @returns any Returns location results.
     * @throws ApiError
     */
    public static journeysControllerSearchLocation(
      query: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/journey/location/{query}',
            path: {
                'query': query,
            },
        });
    }

}
