/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type JourneyVariant = {
    /**
     * One variant of a planned journey (Friendly Public Transport Format, FPTF).
     */
    journey: Record<string, any>;
    /**
     * Point of time the data of the journey variant has been fetched.
     */
    updatedAt: number;
};
