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
  realtimeStatus: Array<string>;
};
