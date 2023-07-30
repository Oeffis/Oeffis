import { Injectable } from "@nestjs/common";
import { ServingLinesClient, StopFinderClient, TripRequestClient } from "@oeffis/vrr_client";

@Injectable()
export class VrrService {

  private readonly servingLines: ServingLinesClient;
  private readonly stopFinder: StopFinderClient;
  private readonly tripRequest: TripRequestClient;

  getHello(): string {
    return "Hello World!";
  }
}
