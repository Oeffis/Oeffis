import { Stop } from "./stops";

export interface StopFinderResponse {
  version: string;
  systemMessages: SystemMessage[];
  locations: Stop[];
}

export interface SystemMessage {
  type: string;
  module: string;
  code: number;
  text: string;
}

export const responseWithLocations = (locations: Stop[]): StopFinderResponse => ({
  "version": "10.4.18.18",
  "systemMessages": [
    {
      "type": "error",
      "module": "BROKER",
      "code": -8011,
      "text": ""
    }
  ],
  "locations": locations
});
