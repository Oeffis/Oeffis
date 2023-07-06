/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * It's the history of all platform-changes for a stop. This element extends HistoricChange.
 */
export type historicPlatformChange = {
    /**
     * Arrival platform.
     */
    ar?: string;
    /**
     * Detailed cause of track change.
     */
    cot?: string;
    /**
     * Departure platform.
     */
    dp?: string;
    /**
     * Timestamp. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    ts?: string;
};

