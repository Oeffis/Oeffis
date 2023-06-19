/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type JourneysRequest = {
    /**
     * Where the journey starts (id of station/stop/location).
     */
    from: string;
    /**
     * Where the journey ends (id of station/stop/location).
     */
    to: string;
};
