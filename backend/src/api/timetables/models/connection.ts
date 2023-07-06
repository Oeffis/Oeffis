/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { connectionStatus } from './connectionStatus';
import type { timetableStop } from './timetableStop';

/**
 * It's information about a connected train at a particular stop.
 */
export type connection = {
    cs: connectionStatus;
    /**
     * EVA station number.
     */
    eva?: number;
    /**
     * Id.
     */
    id: string;
    ref?: timetableStop;
    's': timetableStop;
    /**
     * Time stamp. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    ts: string;
};

