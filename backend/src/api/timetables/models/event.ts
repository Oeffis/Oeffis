/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { eventStatus } from './eventStatus';
import type { message } from './message';

/**
 * An event (arrival or departure) that is part of a stop.
 */
export type event = {
    /**
     * Changed distant endpoint.
     */
    cde?: string;
    /**
     * Cancellation time. Time when the cancellation of this stop was created. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    clt?: string;
    /**
     * Changed platform.
     */
    cp?: string;
    /**
     * Changed path.
     */
    cpth?: string;
    cs?: eventStatus;
    /**
     * Changed time. New estimated or actual departure or arrival time. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    ct?: string;
    /**
     * Distant change.
     */
    dc?: number;
    /**
     * Hidden. 1 if the event should not be shown on WBT because travellers are not supposed to enter or exit the train at this stop.
     */
    hi?: number;
    /**
     * Line. The line indicator (e.g. "3" for an S-Bahn or "45S" for a bus).
     */
    'l'?: string;
    /**
     * List of messages.
     */
    'm'?: Array<message>;
    /**
     * Planned distant endpoint.
     */
    pde?: string;
    /**
     * Planned platform.
     */
    pp?: string;
    /**
     * Planned Path. A sequence of station names separated by the pipe symbols ('|').
     * E.g.: 'Mainz Hbf|R�sselsheim|Frankfrt(M) Flughafen'.
     * For arrival, the path indicates the stations that come before the current station. The first element then is the trip's start station.
     * For departure, the path indicates the stations that come after the current station. The last element in the path then is the trip's destination station.
     * Note that the current station is never included in the path (neither for arrival nor for departure).
     *
     */
    ppth?: string;
    ps?: eventStatus;
    /**
     * Planned time. Planned departure or arrival time. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    pt?: string;
    /**
     * Transition. Trip id of the next or previous train of a shared train. At the start stop this references the previous trip, at the last stop it references the next trip. E.g. '2016448009055686515-1403311438-1'
     */
    tra?: string;
    /**
     * Wing. A sequence of trip id separated by the pipe symbols ('|'). E.g. '-906407760000782942-1403311431'.
     */
    wings?: string;
};

