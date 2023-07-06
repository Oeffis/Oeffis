/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A transport object which keep data for a station.
 */
export type stationData = {
    /**
     * DS100 station code.
     */
    ds100: string;
    /**
     * EVA station number.
     */
    eva: number;
    /**
     * List of meta stations. A sequence of station names separated by the pipe symbols ("|").
     */
    meta?: string;
    /**
     * Station name.
     */
    name: string;
    /**
     * List of platforms. A sequence of platforms separated by the pipe symbols ("|").
     */
    'p'?: string;
};

