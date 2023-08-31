/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JourneyLocation } from './JourneyLocation';
import type { LegDetails } from './LegDetails';
import type { Transportation } from './Transportation';

export type Leg = {
  /**
   * Leg origin
   */
  origin: JourneyLocation;
  /**
   * Leg destination.
   */
  destination: JourneyLocation;
  /**
   * Leg transportation.
   */
  transportation: Transportation;
  /**
   * Leg details.
   */
  details: LegDetails;
};

