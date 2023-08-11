/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JourneyLocation } from './JourneyLocation';
import type { LegDetails } from './LegDetails';
import type { Transportation } from './Transportation';

export type Leg = {
    /**
     * (Full) Name of the location.
     */
    origin: JourneyLocation;
    /**
     * Id of the location.
     */
    destination: JourneyLocation;
    /**
     * Longitude of a location.
     */
    transportation: Transportation;
    /**
     * Type of the location.
     */
    details: LegDetails;
};
