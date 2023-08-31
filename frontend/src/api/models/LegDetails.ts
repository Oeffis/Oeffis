/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LegInfo } from './LegInfo';

export type LegDetails = {
  /**
   * Distance of leg in meter?
   */
  distance: number;
  /**
   * Duration of leg in seconds.
   */
  duration: number;
  /**
   * Leg information.
   */
  infos: Array<LegInfo>;
  /**
   * Leg hints.
   */
  hints: Array<LegInfo>;
  /**
   * Leg real time status.
   */
  realtimeTripStatus: Array<'DEVIATION' | 'EXTRA_STOPS' | 'EXTRA_TRIP' | 'MONITORED' | 'OUTSIDE_REALTIME_WINDOW' | 'PROGNOSIS_IMPOSSIBLE' | 'REALTIME_ONLY_INFORMATIVE' | 'TRIP_CANCELLED'>;
};

