/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { delaySource } from './delaySource';

/**
 * It's the history of all delay-messages for a stop. This element extends HistoricChange.
 */
export type historicDelay = {
    /**
     * The arrival event. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    ar?: string;
    /**
     * Detailed description of delay cause.
     */
    cod?: string;
    /**
     * The departure event. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    dp?: string;
    src?: delaySource;
    /**
     * Timestamp. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    ts?: string;
};

