/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { message } from './message';
import type { timetableStop } from './timetableStop';

/**
 * A timetable is made of a set of TimetableStops and a potential Disruption.
 */
export type timetable = {
    /**
     * EVA station number.
     */
    eva?: number;
    /**
     * List of Message.
     */
    'm'?: Array<message>;
    /**
     * List of TimetableStop.
     */
    's'?: Array<timetableStop>;
    /**
     * Station name.
     */
    station?: string;
};

