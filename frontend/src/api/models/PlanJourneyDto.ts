/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JourneyStopStationIdDto } from './JourneyStopStationIdDto';
import type { JourneyUserLocationDto } from './JourneyUserLocationDto';

export type PlanJourneyDto = {
    /**
     * Location where the journey starts.
     */
    from: (JourneyStopStationIdDto | JourneyUserLocationDto);
    /**
     * Location where the journey ends.
     */
    to: (JourneyStopStationIdDto | JourneyUserLocationDto);
};
