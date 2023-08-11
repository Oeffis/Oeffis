/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Leg } from './Leg';

export type Journey = {
    /**
     * (Full) Name of the location.
     */
    legs: Array<Leg>;
};
