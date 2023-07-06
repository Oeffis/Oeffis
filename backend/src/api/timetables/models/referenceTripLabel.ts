/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * It's a compound data type that contains common data items that characterize a reference trip. The con-tents is represented as a compact 3-tuple in XML.
 */
export type referenceTripLabel = {
    /**
     * Category. Trip category, e.g. "ICE" or "RE".
     */
    'c': string;
    /**
     * Trip/train number, e.g. "4523".
     */
    'n': string;
};

