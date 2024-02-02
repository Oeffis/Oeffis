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
    CancellationStat,
    instanceOfCancellationStat,
    CancellationStatFromJSON,
    CancellationStatFromJSONTyped,
    CancellationStatToJSON,
} from './CancellationStat';
import {
    UnavailableStats,
    instanceOfUnavailableStats,
    UnavailableStatsFromJSON,
    UnavailableStatsFromJSONTyped,
    UnavailableStatsToJSON,
} from './UnavailableStats';

/**
 * @type JourneyStatsAggregatedCancellationStat
 * Aggregated probability of cancellation to happen on journey.
 * @export
 */
export type JourneyStatsAggregatedCancellationStat = { status: 'available' } & CancellationStat | { status: 'unavailable' } & UnavailableStats;

export function JourneyStatsAggregatedCancellationStatFromJSON(json: any): JourneyStatsAggregatedCancellationStat {
    return JourneyStatsAggregatedCancellationStatFromJSONTyped(json, false);
}

export function JourneyStatsAggregatedCancellationStatFromJSONTyped(json: any, ignoreDiscriminator: boolean): JourneyStatsAggregatedCancellationStat {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['status']) {
        case 'available':
            return {...CancellationStatFromJSONTyped(json, true), status: 'available'};
        case 'unavailable':
            return {...UnavailableStatsFromJSONTyped(json, true), status: 'unavailable'};
        default:
            throw new Error(`No variant of JourneyStatsAggregatedCancellationStat exists with 'status=${json['status']}'`);
    }
}

export function JourneyStatsAggregatedCancellationStatToJSON(value?: JourneyStatsAggregatedCancellationStat | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['status']) {
        case 'available':
            return CancellationStatToJSON(value);
        case 'unavailable':
            return UnavailableStatsToJSON(value);
        default:
            throw new Error(`No variant of JourneyStatsAggregatedCancellationStat exists with 'status=${value['status']}'`);
    }

}
