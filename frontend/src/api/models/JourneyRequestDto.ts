/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type JourneyRequestDto = {
    /**
     * Origin (id) of the trip.
     */
    originId: string;
    /**
     * Destination (id) of the trip.
     */
    destinationId: string;
    /**
     * Date of the trip to start (default: current date).
     */
    departure: string;
    /**
     * Use departure date as arrival.
     */
    asArrival: boolean;
};
