/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Trip } from './Trip';

export type TripQueryResponseDto = {
    /**
     * Trip alternatives found.
     */
    alternatives: Array<Trip>;
};
