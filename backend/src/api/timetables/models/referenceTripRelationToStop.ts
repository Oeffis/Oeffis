/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The reference trips relation to the stop, which contains it.
 *
 * * b - BEFORE
 * The reference trip ends before that stop.
 * * e - END
 * The reference trips ends at that stop.
 * * c - BETWEEN
 * The stop is between reference trips start and end, in other words, the stop is contained within its travel path.
 * * s - START
 * The reference trip starts at that stop.
 * * a - AFTER
 * The reference trip starts after that stop.
 *
 */
export enum referenceTripRelationToStop {
    B = 'b',
    E = 'e',
    C = 'c',
    S = 's',
    A = 'a',
}
