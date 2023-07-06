/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { tripLabel } from './tripLabel';

/**
 * It's a reference to another trip, which holds its label and reference trips, if available.
 */
export type tripReference = {
    /**
     * The referred trips reference trip elements.
     */
    rt?: Array<tripLabel>;
    tl: tripLabel;
};

