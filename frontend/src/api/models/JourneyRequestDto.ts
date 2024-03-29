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
 * @interface JourneyRequestDto
 */
export interface JourneyRequestDto {
    /**
     * Origin (id) of the trip.
     * @type {string}
     * @memberof JourneyRequestDto
     */
    originId: string;
    /**
     * Destination (id) of the trip.
     * @type {string}
     * @memberof JourneyRequestDto
     */
    destinationId: string;
    /**
     * Date of the trip to start.
     * @type {Date}
     * @memberof JourneyRequestDto
     */
    departure: Date;
    /**
     * Use departure date as arrival.
     * @type {boolean}
     * @memberof JourneyRequestDto
     */
    asArrival: boolean;
}

/**
 * Check if a given object implements the JourneyRequestDto interface.
 */
export function instanceOfJourneyRequestDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "originId" in value;
    isInstance = isInstance && "destinationId" in value;
    isInstance = isInstance && "departure" in value;
    isInstance = isInstance && "asArrival" in value;

    return isInstance;
}

export function JourneyRequestDtoFromJSON(json: any): JourneyRequestDto {
    return JourneyRequestDtoFromJSONTyped(json, false);
}

export function JourneyRequestDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): JourneyRequestDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'originId': json['originId'],
        'destinationId': json['destinationId'],
        'departure': (new Date(json['departure'])),
        'asArrival': json['asArrival'],
    };
}

export function JourneyRequestDtoToJSON(value?: JourneyRequestDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'originId': value.originId,
        'destinationId': value.destinationId,
        'departure': (value.departure.toISOString()),
        'asArrival': value.asArrival,
    };
}

