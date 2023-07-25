import fetch, { RequestInit } from 'node-fetch';
import { SystemMessage, SystemMessageType } from './vendor/VrrApiTypes';

export class VrrClientBase {

  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async executeFetchRequest(path: string, parameters: Record<string, string>): Promise<any> {
    const options: RequestInit = {
      headers: {},
      method: 'GET',
    };

    const urlWithParams = new URL(path, this.baseUrl);
    urlWithParams.search = new URLSearchParams({
      ...parameters,
      outputFormat: 'rapidJSON',
      version: '10.4.18.18',
    }).toString();

    const url = urlWithParams.toString();

    console.log(`Fetching ${url}`);

    const response = await fetch(url, options);
    const body = await response.text();
    const status = response.status;

    if (!response.ok) {
      throw new Error(`Request failed with unhandled status ${status}: ${body}`);
    }

    const jsonResult = JSON.parse(body);

    this.checkSystemMessagesForErrors(jsonResult.systemMessages);

    return JSON.parse(body);
  }

  private checkSystemMessagesForErrors(systemMessages: SystemMessage[]): void {
    if (!systemMessages) {
      return;
    }

    const errors = systemMessages.filter((message) => {
      // The API sometimes returns errors that are not really errors...
      if (message.type === SystemMessageType.Error && message.module === 'BROKER' && message.code === -8011 && message.text === '') {
        return false;
      }

      return message.type === SystemMessageType.Error;
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => `${error.type} / ${error.subType} / ${error.code}: (from ${error.module}): ${error.text}`);
      throw new Error(`Request failed with system messages: ${formattedErrors.join(', ')}`);
    }
  }

}
