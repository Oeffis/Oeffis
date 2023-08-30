/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from './Location';

export type LocationDetails = {
  /**
   * Short name of the location.
   */
  shortName: string;
  /**
   * Quality how well the given location meets the related query (biggest number is the best result).
   */
  matchQuality: number;
  /**
   * Parent location of this location.
   */
  parent: Location;
  /**
   * Latitude of a location.
   */
  latitude: number;
  /**
   * Longitude of a location.
   */
  longitude: number;
};
