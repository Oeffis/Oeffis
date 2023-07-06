/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { referenceTripLabel } from './referenceTripLabel';
import type { referenceTripStopLabel } from './referenceTripStopLabel';

/**
 * A reference trip is another real trip, but it doesn't have its own stops and events. It refers only to its ref-erenced regular trip. The reference trip collects mainly all different attributes of the referenced regular trip.
 */
export type referenceTrip = {
    /**
     * The cancellation flag. True means, the reference trip is cancelled.
     */
    'c': boolean;
    ea: referenceTripStopLabel;
    /**
     * An id that uniquely identifies the reference trip. It consists of the following two elements separated by dashes:
     *
     * * A 'daily trip id' that uniquely identifies a reference trip within one day. This id is typically reused on subsequent days. This could be negative.
     * * A 10-digit date specifier (YYMMddHHmm) that indicates the planned departure date of the referenced regular trip from its start station.
     *
     * Example:
     *
     * '-7874571842864554321-1403311221' would be used for a trip with daily trip id '-7874571842864554321' that starts on march the 31th 2014.
     *
     */
    id: string;
    rtl: referenceTripLabel;
    sd: referenceTripStopLabel;
};

