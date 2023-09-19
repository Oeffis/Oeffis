/* tslint:disable */
/* eslint-disable */
/**
 * NestJS Swagger
 * API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Trip
 */
export interface Trip {
    /**
     * Planned arrival time at destination.
     * @type {string}
     * @memberof Trip
     */
    arrivalTimePlannedJourneyDestination?: string;
    /**
     * Planned departure time at Origin.
     * @type {string}
     * @memberof Trip
     */
    departureTimePlannedJourneyOrigin?: string;
    /**
     * Status information about trip.
     * @type {string}
     * @memberof Trip
     */
    status?: string;
    /**
     * Train number.
     * @type {string}
     * @memberof Trip
     */
    trainNumber?: string;
}

/**
 * Check if a given object implements the Trip interface.
 */
export function instanceOfTrip(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TripFromJSON(json: any): Trip {
    return TripFromJSONTyped(json, false);
}

export function TripFromJSONTyped(json: any, ignoreDiscriminator: boolean): Trip {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'arrivalTimePlannedJourneyDestination': !exists(json, 'arrivalTimePlannedJourneyDestination') ? undefined : json['arrivalTimePlannedJourneyDestination'],
        'departureTimePlannedJourneyOrigin': !exists(json, 'departureTimePlannedJourneyOrigin') ? undefined : json['departureTimePlannedJourneyOrigin'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'trainNumber': !exists(json, 'trainNumber') ? undefined : json['trainNumber'],
    };
}

export function TripToJSON(value?: Trip | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'arrivalTimePlannedJourneyDestination': value.arrivalTimePlannedJourneyDestination,
        'departureTimePlannedJourneyOrigin': value.departureTimePlannedJourneyOrigin,
        'status': value.status,
        'trainNumber': value.trainNumber,
    };
}

