/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Event status.
 *
 * * p - PLANNED
 * The event was planned. This status is also used when the cancellation of an event has been revoked.
 * * a - ADDED
 * The event was added to the planned data (new stop).
 * * c - CANCELLED
 * The event was canceled (as changedstatus, can apply to planned and added stops).
 *
 */
export enum eventStatus {
    P = 'p',
    A = 'a',
    C = 'c',
}
