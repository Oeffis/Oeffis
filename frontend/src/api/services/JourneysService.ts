/* istanbul ignore file */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
/* tslint:disable */
/* eslint-disable */
import type { JourneyLocation } from '../models/JourneyLocation';
import type { JourneyVariant } from '../models/JourneyVariant';
import type { PlanJourneyDto } from '../models/PlanJourneyDto';

export class JourneysService {

    /**
     * Returns variants of planned journey.
     * Plan variants of a journey.
     * @param requestBody
     * @returns JourneyVariant Returns variants of planned journey.
     * @throws ApiError
     */
    public static journeysControllerPlanJourney(
      requestBody: PlanJourneyDto,
    ): CancelablePromise<Array<JourneyVariant>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/journeys',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Returns refreshed data of a journey variant.
     * Refresh (receive updated data of) a journey variant that has been planned before.
     * @param token
     * @returns JourneyVariant Returns refreshed journey variant.
     * @throws ApiError
     */
    public static journeysControllerRefreshJourney(
      token: string,
    ): CancelablePromise<JourneyVariant> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/journeys/refresh/{token}',
            path: {
                'token': token,
            },
            errors: {
                400: `Refreshing journey variant is not available with endpoint being used.`,
            },
        });
    }

    /**
     * Returns all locations matching the given query.
     * Search a location with the given query.
     * @param query
     * @returns JourneyLocation Returns location results.
     * @throws ApiError
     */
    public static journeysControllerSearchLocation(
      query: string,
    ): CancelablePromise<Array<JourneyLocation>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/journeys/location/{query}',
            path: {
                'query': query,
            },
        });
    }

}
