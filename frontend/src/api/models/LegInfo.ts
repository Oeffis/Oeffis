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
 * @interface LegInfo
 */
export interface LegInfo {
    /**
     * Leg origin
     * @type {string}
     * @memberof LegInfo
     */
    content: string;
}

/**
 * Check if a given object implements the LegInfo interface.
 */
export function instanceOfLegInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "content" in value;

    return isInstance;
}

export function LegInfoFromJSON(json: any): LegInfo {
    return LegInfoFromJSONTyped(json, false);
}

export function LegInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LegInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'content': json['content'],
    };
}

export function LegInfoToJSON(value?: LegInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'content': value.content,
    };
}

