import { Inject, Injectable } from "@nestjs/common";
import { HafasClient, Journeys, Location, Station, Stop } from "hafas-client";
import { HAFAS_CLIENT } from "src/symbols";
import { JourneyRequest } from "./entities/journey.request.entity";


/**
 * Service that uses HAFAS to plan a journey.
 */
@Injectable()
export class JourneyService {
  constructor(
    @Inject(HAFAS_CLIENT) private hafas: HafasClient
  ) { }

  searchLocations(locationQuery: string): Promise<ReadonlyArray<Station | Stop | Location>> {
    return this.hafas.locations(
      locationQuery,
      {
        language: "de",
      }
    );
  }

  /**
   * Plans and returns a journey based on the given journey request.
   *
   * @param journeyRequest request for a journey
   * @return all possible plans for the journey
   */
  planJourney(journeyRequest: JourneyRequest): Promise<Journeys> {
    return this.hafas.journeys(
      journeyRequest.from, journeyRequest.to,
      {
        results: 3,
        language: "de",
      }
    );
  }
}
