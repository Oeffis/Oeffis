/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { connection } from './connection';
import type { event } from './event';
import type { historicDelay } from './historicDelay';
import type { historicPlatformChange } from './historicPlatformChange';
import type { message } from './message';
import type { referenceTripRelation } from './referenceTripRelation';
import type { tripLabel } from './tripLabel';
import type { tripReference } from './tripReference';

/**
 * A stop is a part of a Timetable.
 */
export type timetableStop = {
    ar?: event;
    /**
     * Connection element.
     */
    conn?: Array<connection>;
    dp?: event;
    /**
     * The eva code of the station of this stop. Example '8000105' for Frankfurt(Main)Hbf.
     */
    eva: number;
    /**
     * Historic delay element.
     */
    hd?: Array<historicDelay>;
    /**
     * Historic platform change element.
     */
    hpc?: Array<historicPlatformChange>;
    /**
     * An id that uniquely identifies the stop. It consists of the following three elements separated by dashes
     * * a 'daily trip id' that uniquely identifies a trip within one day. This id is typically reused on subsequent days. This could be negative.
     * * a 6-digit date specifier (YYMMdd) that indicates the planned departure date of the trip from its start station.
     * * an index that indicates the position of the stop within the trip (in rare cases, one trip may arrive multiple times at one station). Added trips get indices above 100.
     * Example '-7874571842864554321-1403311221-11' would be used for a trip with daily trip id '-7874571842864554321' that starts on march the 31th 2014 and where the current station is the 11th stop.
     *
     */
    id: string;
    /**
     * Message element.
     */
    'm'?: Array<message>;
    ref?: tripReference;
    /**
     * Reference trip relation element.
     */
    rtr?: Array<referenceTripRelation>;
    tl?: tripLabel;
};

