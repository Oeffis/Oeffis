/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { tripType } from './tripType';

/**
 * It's a compound data type that contains common data items that characterize a Trip. The contents is represented as a compact 6-tuple in XML.
 */
export type tripLabel = {
    /**
     * Category. Trip category, e.g. "ICE" or "RE".
     */
    'c': string;
    /**
     * Filter flags.
     */
    'f'?: string;
    /**
     * Trip/train number, e.g. "4523".
     */
    'n': string;
    /**
     * Owner. A unique short-form and only intended to map a trip to specific evu.
     */
    'o': string;
    't'?: tripType;
};

