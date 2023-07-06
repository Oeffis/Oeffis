/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Connection status.
 *
 * * w - WAITING
 * This (regular) connection is waiting.
 * * n - TRANSITION
 * This (regular) connection CANNOT wait.
 * * a - ALTERNATIVE
 * This is an alternative (unplanned) connection that has been introduced as a replacement for one regular connection that cannot wait. The connections "tl" (triplabel) attribute might in this case refer to the replaced connection (or more specifi-cally the trip from that connection). Alternative connections are always waiting (they are re-moved otherwise).
 *
 */
export enum connectionStatus {
    W = 'w',
    N = 'n',
    A = 'a',
}
