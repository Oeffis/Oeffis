import { LOCATIONSUGGESTSchema } from "./vendor/VrrApiTypes";
import fetch, { Response, RequestInit } from 'node-fetch';

export class VrrApiHttpClient {

  public async findStop(): Promise<LOCATIONSUGGESTSchema> {
    return this.executeFetchRequest('http://openservice-test.vrr.de/static03/XML_STOPFINDER_REQUEST', {
      name_sf: '6.787835:51.231000:WGS84[dd.ddddd]',
      type_sf: 'coord',
    });
  }

  private async executeFetchRequest(baseUrl: string, parameters: Record<string, string>): Promise<any> {
    const options: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    const urlWithParams = new URL(baseUrl);
    urlWithParams.search = new URLSearchParams({
      ...urlWithParams.searchParams,
      outputFormat: 'rapidJSON',
      version: '10.4.18.18',
    }).toString();

    const response = await fetch(urlWithParams.toString(), options);
    return response.json();
  }
}

async function main() {
  const client = new VrrApiHttpClient();
  const result = await client.findStop();
  console.log(result);
}

main()
  .then(console.log)
  .catch(console.error);
