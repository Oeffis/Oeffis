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

import {
    DelayStats,
    instanceOfDelayStats,
    DelayStatsFromJSON,
    DelayStatsFromJSONTyped,
    DelayStatsToJSON,
} from './DelayStats';
import {
    UnavailableDelayStats,
    instanceOfUnavailableDelayStats,
    UnavailableDelayStatsFromJSON,
    UnavailableDelayStatsFromJSONTyped,
    UnavailableDelayStatsToJSON,
} from './UnavailableDelayStats';

/**
 * @type LegStatsDestinationDelayStats
 * Delay statistics at destination.
 * @export
 */
export type LegStatsDestinationDelayStats = { status: 'available' } & DelayStats | { status: 'unavailable' } & UnavailableDelayStats;

export function LegStatsDestinationDelayStatsFromJSON(json: any): LegStatsDestinationDelayStats {
    return LegStatsDestinationDelayStatsFromJSONTyped(json, false);
}

export function LegStatsDestinationDelayStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): LegStatsDestinationDelayStats {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['status']) {
        case 'available':
            return {...DelayStatsFromJSONTyped(json, true), status: 'available'};
        case 'unavailable':
            return {...UnavailableDelayStatsFromJSONTyped(json, true), status: 'unavailable'};
        default:
            throw new Error(`No variant of LegStatsDestinationDelayStats exists with 'status=${json['status']}'`);
    }
}

export function LegStatsDestinationDelayStatsToJSON(value?: LegStatsDestinationDelayStats | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['status']) {
        case 'available':
            return DelayStatsToJSON(value);
        case 'unavailable':
            return UnavailableDelayStatsToJSON(value);
        default:
            throw new Error(`No variant of LegStatsDestinationDelayStats exists with 'status=${value['status']}'`);
    }

}

