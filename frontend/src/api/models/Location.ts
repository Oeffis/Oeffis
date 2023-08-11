/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationDetails } from './LocationDetails';

export type Location = {
    /**
     * Id of the location.
     */
    id: string;
    /**
     * (Full) Name of the location.
     */
    name: string;
    /**
     * Type of the location.
     */
    type: string;
    /**
     * Further details of the location.
     */
    details: LocationDetails;
};
