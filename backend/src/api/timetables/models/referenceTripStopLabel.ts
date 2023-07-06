/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * It's a compound data type that contains common data items that characterize a reference trip stop. The contents is represented as a compact 4-tuple in XML.
 */
export type referenceTripStopLabel = {
    /**
     * The eva number of the correspondent stop of the regular trip.
     */
    eva: number;
    /**
     * The index of the correspondent stop of the regu-lar trip.
     */
    'i': number;
    /**
     * The (long) name of the correspondent stop of the regular trip.
     */
    'n': string;
    /**
     * The planned time of the correspondent stop of the regular trip.
     */
    pt: string;
};

