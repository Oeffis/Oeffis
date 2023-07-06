/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { stationData } from './stationData';

/**
 * A wrapper that represents multiple StationData objects.
 */
export type multipleStationData = {
    /**
     * List of stations with additional data.
     */
    station: Array<stationData>;
};

