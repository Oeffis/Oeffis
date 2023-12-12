import fetch, { RequestInit } from "node-fetch";
import { Module, SystemMessage, SystemMessageType } from "./vendor/VrrApiTypes";

export const SCHEMA_CONVERTER_CONFIG = {
  logSchemaErrors: true
};

export interface BaseApiResponse {
  systemMessages?: SystemMessage[];
}

export type SchemaConverter<T extends BaseApiResponse> = (json: string) => T;

export function warpAsFailSafeSchemaConverter<T extends BaseApiResponse>(
  schemaConverter: SchemaConverter<T>,
): SchemaConverter<T> {
  return (json: string) => {
    // In some cases the API will return json that does not conform to the schema.
    // The best workaround is to just accept it as json. This will need to be
    // reworked in the future.
    try {
      return schemaConverter(json);
    } catch (e) {
      if (SCHEMA_CONVERTER_CONFIG.logSchemaErrors)
        console.error("Ignoring error while parsing response", e);
      return JSON.parse(json) as T;
    }
  };
}

export class VrrClientBase {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async executeFetchRequest<T extends BaseApiResponse>(
    path: string,
    parameters: Record<string, string | number>,
    schemaConverter: SchemaConverter<T>,
  ): Promise<T> {
    const options: RequestInit = {
      headers: {},
      method: "GET"
    };

    const urlWithParams = new URL(path, this.baseUrl);
    urlWithParams.search = new URLSearchParams({
      ...parameters,
      outputFormat: "rapidJSON",
      version: "10.4.18.18"
    }).toString();

    const url = urlWithParams.toString();

    const response = await fetch(url, options);
    const body = await response.text();
    const status = response.status;

    if (!response.ok) {
      throw new Error(
        `Request failed with unhandled status ${status}: ${body}`,
      );
    }

    const jsonResult = schemaConverter(body);

    try {
      this.checkSystemMessagesForErrors(jsonResult.systemMessages);
    } catch (error: unknown) {

      // Only throw Error if there are no results present.
      if (error instanceof SystemMessageError
        && !this.areResultsPresent(jsonResult)) {

        throw error;
      }
    }

    return jsonResult;
  }

  private areResultsPresent<T extends BaseApiResponse>(jsonResult: T): boolean {
    return (jsonResult as unknown as { locations: [] }).locations?.length > 0 // a) locations + departureMonitor request
      || (jsonResult as unknown as { journeys: [] }).journeys?.length > 0 // b) trip request
      || (jsonResult as unknown as { lines: [] }).lines?.length > 0; // c) serving lines request
  }

  private checkSystemMessagesForErrors(
    systemMessages: SystemMessage[] | undefined,
  ): void {
    if (!systemMessages) {
      return;
    }

    const errors = systemMessages.filter((message) => {
      // The API sometimes returns errors that are not really errors...
      if (
        message.type === SystemMessageType.Error &&
        message.module === Module.Broker &&
        message.code === -8011 &&
        message.text === ""
      ) {
        return false;
      }

      return message.type === SystemMessageType.Error;
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map(
        (error) =>
          `${error.type} / ${error.subType} / ${error.code}: (from ${error.module}): ${error.text}`,
      );
      const message = `Request failed with system messages: ${formattedErrors.join(", ")}`;
      throw new SystemMessageError(message, errors);
    }
  }
}

export class SystemMessageError extends Error {
  public readonly systemMessages: SystemMessage[];

  constructor(message: string, systemMessages: SystemMessage[]) {
    super(message);
    this.systemMessages = systemMessages;
  }
}
