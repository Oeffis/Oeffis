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
import type { TransportationDestination } from './TransportationDestination';
import {
    TransportationDestinationFromJSON,
    TransportationDestinationFromJSONTyped,
    TransportationDestinationToJSON,
} from './TransportationDestination';

/**
 * 
 * @export
 * @interface Transportation
 */
export interface Transportation {
    /**
     * Id of transportation vehicle.
     * @type {string}
     * @memberof Transportation
     */
    id: string;
    /**
     * Name of transportation vehicle.
     * @type {string}
     * @memberof Transportation
     */
    name: string;
    /**
     * Line (number) or short name of transportation vehicle.
     * @type {string}
     * @memberof Transportation
     */
    line: string;
    /**
     * 
     * @type {TransportationDestination}
     * @memberof Transportation
     */
    destination: TransportationDestination;
    /**
     * Operator of transportation vehicle (name). Can be empty string, if none is given.
     * @type {string}
     * @memberof Transportation
     */
    operator: string;
    /**
     * Hints about the specific transportation vehicle. Can be empty.
     * @type {Array<string>}
     * @memberof Transportation
     */
    hints: Array<string>;
}

/**
 * Check if a given object implements the Transportation interface.
 */
export function instanceOfTransportation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "line" in value;
    isInstance = isInstance && "destination" in value;
    isInstance = isInstance && "operator" in value;
    isInstance = isInstance && "hints" in value;

    return isInstance;
}

export function TransportationFromJSON(json: any): Transportation {
    return TransportationFromJSONTyped(json, false);
}

export function TransportationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Transportation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'line': json['line'],
        'destination': TransportationDestinationFromJSON(json['destination']),
        'operator': json['operator'],
        'hints': json['hints'],
    };
}

export function TransportationToJSON(value?: Transportation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'line': value.line,
        'destination': TransportationDestinationToJSON(value.destination),
        'operator': value.operator,
        'hints': value.hints,
    };
}

