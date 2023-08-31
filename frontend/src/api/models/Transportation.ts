/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Trip } from './Trip';

export type Transportation = {
  /**
   * Name of transportation vehicle.
   */
  name: string;
  /**
   * Trips depending on this transportation.
   */
  trips: Array<Trip>;
};

