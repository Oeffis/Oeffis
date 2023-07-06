/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { distributorType } from './distributorType';

/**
 * An additional message to a given station-based disruption by a specific distributor.
 */
export type distributorMessage = {
    /**
     * Internal text.
     */
    int?: string;
    /**
     * Distributor name.
     */
    'n'?: string;
    't'?: distributorType;
    /**
     * Timestamp. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    ts?: string;
};

