/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationDetails } from './LocationDetails';
import type { Time } from './Time';

export type JourneyLocation = {
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
  /**
   * Arrival time.
   */
  arrival: Time;
  /**
   * Departure time.
   */
  departure: Time;
};

