/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Trip } from './Trip';

export type Transportation = {
    /**
     * Further details of the location.
     */
    name: string;
    /**
     * Further details of the location.
     */
    trips: Array<Trip>;
};
