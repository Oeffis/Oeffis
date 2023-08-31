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
  type: Location.type;
  /**
   * Further details of the location.
   */
  details: LocationDetails;
};

export namespace Location {

  /**
   * Type of the location.
   */
  export enum type {
    ADDRESS = 'address',
    CROSSING = 'crossing',
    GIS = 'gis',
    LOCALITY = 'locality',
    PARKING = 'parking',
    PLATFORM = 'platform',
    POI = 'poi',
    POI_HIERARCHY = 'poiHierarchy',
    SHARING = 'sharing',
    STOP = 'stop',
    STREET = 'street',
    SUBURB = 'suburb',
    UNKNOWN = 'unknown',
    SINGLEHOUSE = 'singlehouse',
  }


}

