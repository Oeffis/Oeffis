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
import type { LegDestinationLocation } from './LegDestinationLocation';
import {
    LegDestinationLocationFromJSON,
    LegDestinationLocationFromJSONTyped,
    LegDestinationLocationToJSON,
} from './LegDestinationLocation';
import type { LegDetails } from './LegDetails';
import {
    LegDetailsFromJSON,
    LegDetailsFromJSONTyped,
    LegDetailsToJSON,
} from './LegDetails';
import type { LegOriginLocation } from './LegOriginLocation';
import {
    LegOriginLocationFromJSON,
    LegOriginLocationFromJSONTyped,
    LegOriginLocationToJSON,
} from './LegOriginLocation';
import type { LegStats } from './LegStats';
import {
    LegStatsFromJSON,
    LegStatsFromJSONTyped,
    LegStatsToJSON,
} from './LegStats';
import type { Transportation } from './Transportation';
import {
    TransportationFromJSON,
    TransportationFromJSONTyped,
    TransportationToJSON,
} from './Transportation';

/**
 * 
 * @export
 * @interface TransportationLeg
 */
export interface TransportationLeg {
    /**
     * 
     * @type {LegOriginLocation}
     * @memberof TransportationLeg
     */
    origin: LegOriginLocation;
    /**
     * 
     * @type {LegDestinationLocation}
     * @memberof TransportationLeg
     */
    destination: LegDestinationLocation;
    /**
     * 
     * @type {LegDetails}
     * @memberof TransportationLeg
     */
    details: LegDetails;
    /**
     * Type of the leg.
     * @type {string}
     * @memberof TransportationLeg
     */
    type: TransportationLegTypeEnum;
    /**
     * 
     * @type {Transportation}
     * @memberof TransportationLeg
     */
    transportation: Transportation;
    /**
     * 
     * @type {LegStats}
     * @memberof TransportationLeg
     */
    legStats: LegStats;
}


/**
 * @export
 */
export const TransportationLegTypeEnum = {
    Transportation: 'transportation',
    Footpath: 'footpath'
} as const;
export type TransportationLegTypeEnum = typeof TransportationLegTypeEnum[keyof typeof TransportationLegTypeEnum];


/**
 * Check if a given object implements the TransportationLeg interface.
 */
export function instanceOfTransportationLeg(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "origin" in value;
    isInstance = isInstance && "destination" in value;
    isInstance = isInstance && "details" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "transportation" in value;
    isInstance = isInstance && "legStats" in value;

    return isInstance;
}

export function TransportationLegFromJSON(json: any): TransportationLeg {
    return TransportationLegFromJSONTyped(json, false);
}

export function TransportationLegFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransportationLeg {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'origin': LegOriginLocationFromJSON(json['origin']),
        'destination': LegDestinationLocationFromJSON(json['destination']),
        'details': LegDetailsFromJSON(json['details']),
        'type': json['type'],
        'transportation': TransportationFromJSON(json['transportation']),
        'legStats': LegStatsFromJSON(json['legStats']),
    };
}

export function TransportationLegToJSON(value?: TransportationLeg | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'origin': LegOriginLocationToJSON(value.origin),
        'destination': LegDestinationLocationToJSON(value.destination),
        'details': LegDetailsToJSON(value.details),
        'type': value.type,
        'transportation': TransportationToJSON(value.transportation),
        'legStats': LegStatsToJSON(value.legStats),
    };
}

