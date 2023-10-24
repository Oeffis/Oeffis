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
 * @interface LocationCoordinates
 */
export interface LocationCoordinates {
    /**
     * Latitude of the location.
     * @type {number}
     * @memberof LocationCoordinates
     */
    latitude: number;
    /**
     * Longitude of the location.
     * @type {number}
     * @memberof LocationCoordinates
     */
    longitude: number;
}

/**
 * Check if a given object implements the LocationCoordinates interface.
 */
export function instanceOfLocationCoordinates(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "latitude" in value;
    isInstance = isInstance && "longitude" in value;

    return isInstance;
}

export function LocationCoordinatesFromJSON(json: any): LocationCoordinates {
    return LocationCoordinatesFromJSONTyped(json, false);
}

export function LocationCoordinatesFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationCoordinates {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latitude': json['latitude'],
        'longitude': json['longitude'],
    };
}

export function LocationCoordinatesToJSON(value?: LocationCoordinates | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'latitude': value.latitude,
        'longitude': value.longitude,
    };
}
