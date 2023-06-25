import { Inject, Injectable } from "@nestjs/common";
import {
  HafasClient,
  Journeys,
  JourneysOptions,
  JourneyWithRealtimeData,
  Location,
  LocationsOptions,
  RefreshJourneyOptions,
  Station,
  Stop
} from "hafas-client";
import { HAFAS_CLIENT, HAFAS_LANGUAGE } from "../../symbols";
import { JourneysRequest } from "../entities/journeys.request.entity";

/** Type alias for results of location query. */
export type Locations = ReadonlyArray<Station | Stop | Location>;

/**
 * Service that uses HAFAS to plan journeys.
 */
@Injectable()
export class JourneysService {

  constructor(
    @Inject(HAFAS_CLIENT) private hafas: HafasClient
  ) { }


  /**
   * Plans and returns options for the requested journey.
   *
   * @param journeyRequest request for a journey
   * @return different options to plan the journey
   */
  planJourney(journeyRequest: JourneysRequest): Promise<Journeys> {
    const options: JourneysOptions = {
      results: 3,
      language: HAFAS_LANGUAGE,
    };

    return this.hafas
      .journeys(journeyRequest.from, journeyRequest.to, options);
  }

  /**
   * Refreshes (receives updated data of) a journey that has been planned before.
   *
   * @param refreshToken token of journey to refresh
   * @return refreshed journey
   */
  refreshJourney(refreshToken: string): Promise<JourneyWithRealtimeData> {
    const options: RefreshJourneyOptions = {
      language: HAFAS_LANGUAGE
    };

    // Depending on 'hafas-client' profile refreshJourney could not be present.
    const refreshJourneyFunc = this.hafas.refreshJourney;
    return refreshJourneyFunc !== undefined
      ? refreshJourneyFunc(refreshToken, options)
      : Promise.reject("refreshJourney not possible");
  }

  /**
   * Searches and returns available locations matching the given query.
   *
   * @param locationQuery query for searching locations
   * @return locations matching the query
   */
  searchLocations(locationQuery: string): Promise<Locations> {
    const options: LocationsOptions = {
      results: 5,
      language: HAFAS_LANGUAGE,
    };

    return this.hafas
      .locations(locationQuery, options);
  }

}
