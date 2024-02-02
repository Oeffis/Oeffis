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
 * @interface CancellationStat
 */
export interface CancellationStat {
    /**
     * Status of the leg stats.
     * @type {string}
     * @memberof CancellationStat
     */
    status: CancellationStatStatusEnum;
    /**
     * Probability of leg/trip being cancelled in the past.
     * @type {number}
     * @memberof CancellationStat
     */
    cancellationProbability: number;
}


/**
 * @export
 */
export const CancellationStatStatusEnum = {
    Available: 'available',
    Unavailable: 'unavailable'
} as const;
export type CancellationStatStatusEnum = typeof CancellationStatStatusEnum[keyof typeof CancellationStatStatusEnum];


/**
 * Check if a given object implements the CancellationStat interface.
 */
export function instanceOfCancellationStat(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "cancellationProbability" in value;

    return isInstance;
}

export function CancellationStatFromJSON(json: any): CancellationStat {
    return CancellationStatFromJSONTyped(json, false);
}

export function CancellationStatFromJSONTyped(json: any, ignoreDiscriminator: boolean): CancellationStat {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
        'cancellationProbability': json['cancellationProbability'],
    };
}

export function CancellationStatToJSON(value?: CancellationStat | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
        'cancellationProbability': value.cancellationProbability,
    };
}
