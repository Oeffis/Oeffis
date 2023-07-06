/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { referenceTrip } from './referenceTrip';
import type { referenceTripRelationToStop } from './referenceTripRelationToStop';

/**
 * A reference trip relation holds how a reference trip is related to a stop, for instance the reference trip starts after the stop. Stop contains a collection of that type, only if reference trips are available.
 */
export type referenceTripRelation = {
    rt: referenceTrip;
    rts: referenceTripRelationToStop;
};

