/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StopFinderAtCoordinatesParametersDto } from '../models/StopFinderAtCoordinatesParametersDto';
import type { StopFinderAtCoordinatesResponseDto } from '../models/StopFinderAtCoordinatesResponseDto';
import type { StopFinderByNameParametersDto } from '../models/StopFinderByNameParametersDto';
import type { StopFinderByNameResponseDto } from '../models/StopFinderByNameResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StopFinderService {

    /**
     * finds a stop at given coordinates
     * @param requestBody
     * @returns StopFinderAtCoordinatesResponseDto Returns the found stops.
     * @throws ApiError
     */
    public static stopFinderControllerFindStopsAtCoordinates(
        requestBody: StopFinderAtCoordinatesParametersDto,
    ): CancelablePromise<StopFinderAtCoordinatesResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stop_finder/at_coordinates',
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
     * @returns StopFinderByNameResponseDto Returns the found stops.
     * @throws ApiError
     */
    public static stopFinderControllerFindStopByName(
        requestBody: StopFinderByNameParametersDto,
    ): CancelablePromise<StopFinderByNameResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stop_finder/by_name',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request.`,
            },
        });
    }

}
