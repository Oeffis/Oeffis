import { SystemMessage } from './vendor/VrrApiTypes';
export type BaseApiResponse = {
    systemMessages?: SystemMessage[];
};
export type SchemaConverter<T extends BaseApiResponse> = (json: string) => T;
export declare function warpAsFailSafeSchemaConverter<T extends BaseApiResponse>(schemaConverter: SchemaConverter<T>): SchemaConverter<T>;
export declare class VrrClientBase {
    private readonly baseUrl;
    constructor(baseUrl: string);
    protected executeFetchRequest<T extends BaseApiResponse>(path: string, parameters: Record<string, string | number>, schemaConverter: SchemaConverter<T>): Promise<T>;
    private checkSystemMessagesForErrors;
}
