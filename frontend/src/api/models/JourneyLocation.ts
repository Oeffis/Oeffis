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
import type { LocationDetails } from './LocationDetails';
import {
    LocationDetailsFromJSON,
    LocationDetailsFromJSONTyped,
    LocationDetailsToJSON,
} from './LocationDetails';

/**
 * 
 * @export
 * @interface JourneyLocation
 */
export interface JourneyLocation {
    /**
     * Id of the location.
     * @type {string}
     * @memberof JourneyLocation
     */
    id: string;
    /**
     * (Full) Name of the location.
     * @type {string}
     * @memberof JourneyLocation
     */
    name: string;
    /**
     * Type of the location.
     * @type {string}
     * @memberof JourneyLocation
     */
    type: JourneyLocationTypeEnum;
    /**
     * 
     * @type {LocationDetails}
     * @memberof JourneyLocation
     */
    details: LocationDetails;
    /**
     * Planned arrival time.
     * @type {Date}
     * @memberof JourneyLocation
     */
    arrivalTimePlanned: Date;
    /**
     * Planned departure time.
     * @type {Date}
     * @memberof JourneyLocation
     */
    departureTimePlanned: Date;
}


/**
 * @export
 */
export const JourneyLocationTypeEnum = {
    Address: 'address',
    Crossing: 'crossing',
    Gis: 'gis',
    Locality: 'locality',
    Parking: 'parking',
    Platform: 'platform',
    Poi: 'poi',
    PoiHierarchy: 'poiHierarchy',
    Sharing: 'sharing',
    Stop: 'stop',
    Street: 'street',
    Suburb: 'suburb',
    Unknown: 'unknown',
    Singlehouse: 'singlehouse'
} as const;
export type JourneyLocationTypeEnum = typeof JourneyLocationTypeEnum[keyof typeof JourneyLocationTypeEnum];


/**
 * Check if a given object implements the JourneyLocation interface.
 */
export function instanceOfJourneyLocation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "details" in value;
    isInstance = isInstance && "arrivalTimePlanned" in value;
    isInstance = isInstance && "departureTimePlanned" in value;

    return isInstance;
}

export function JourneyLocationFromJSON(json: any): JourneyLocation {
    return JourneyLocationFromJSONTyped(json, false);
}

export function JourneyLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): JourneyLocation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'type': json['type'],
        'details': LocationDetailsFromJSON(json['details']),
        'arrivalTimePlanned': (new Date(json['arrivalTimePlanned'])),
        'departureTimePlanned': (new Date(json['departureTimePlanned'])),
    };
}

export function JourneyLocationToJSON(value?: JourneyLocation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'type': value.type,
        'details': LocationDetailsToJSON(value.details),
        'arrivalTimePlanned': (value.arrivalTimePlanned.toISOString()),
        'departureTimePlanned': (value.departureTimePlanned.toISOString()),
    };
}

