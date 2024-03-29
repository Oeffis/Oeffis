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
import type { LegInfoValidity } from './LegInfoValidity';
import {
    LegInfoValidityFromJSON,
    LegInfoValidityFromJSONTyped,
    LegInfoValidityToJSON,
} from './LegInfoValidity';

/**
 * 
 * @export
 * @interface LegInfo
 */
export interface LegInfo {
    /**
     * Priority of information.
     * @type {string}
     * @memberof LegInfo
     */
    priority: LegInfoPriorityEnum;
    /**
     * 
     * @type {LegInfoValidity}
     * @memberof LegInfo
     */
    validity: LegInfoValidity;
    /**
     * Title of information. Empty string if there is none.
     * @type {string}
     * @memberof LegInfo
     */
    title: string;
    /**
     * Content of information (can be formatted with HTML)
     * @type {string}
     * @memberof LegInfo
     */
    content: string;
    /**
     * URL that supplies given content.
     * @type {string}
     * @memberof LegInfo
     */
    sourceUrl: string;
    /**
     * Additional links supplying further information. Can be empty if there are none.
     * @type {Array<string>}
     * @memberof LegInfo
     */
    additionalLinks: Array<string>;
}


/**
 * @export
 */
export const LegInfoPriorityEnum = {
    Low: 'low',
    Normal: 'normal',
    High: 'high',
    VeryHigh: 'veryHigh'
} as const;
export type LegInfoPriorityEnum = typeof LegInfoPriorityEnum[keyof typeof LegInfoPriorityEnum];


/**
 * Check if a given object implements the LegInfo interface.
 */
export function instanceOfLegInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "priority" in value;
    isInstance = isInstance && "validity" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "content" in value;
    isInstance = isInstance && "sourceUrl" in value;
    isInstance = isInstance && "additionalLinks" in value;

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
        
        'priority': json['priority'],
        'validity': LegInfoValidityFromJSON(json['validity']),
        'title': json['title'],
        'content': json['content'],
        'sourceUrl': json['sourceUrl'],
        'additionalLinks': json['additionalLinks'],
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
        
        'priority': value.priority,
        'validity': LegInfoValidityToJSON(value.validity),
        'title': value.title,
        'content': value.content,
        'sourceUrl': value.sourceUrl,
        'additionalLinks': value.additionalLinks,
    };
}

