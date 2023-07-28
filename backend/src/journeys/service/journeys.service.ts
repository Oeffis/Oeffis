import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { HafasClient, Location, LocationsOptions, RefreshJourneyOptions } from "hafas-client";
import { ApiService } from "vrr/service/api.service";
import { FPTFSupport } from "../../hafas/FPTFSupport";
import { HAFAS_CLIENT, HAFAS_LANGUAGE } from "../../symbols";
import { JourneyStopStationIdDto, JourneyUserLocationDto } from "../dto/journey.location.dto";
import { PlanJourneyDto } from "../dto/journey.parameters.dto";
import { JourneyLocation } from "../entities/journey.location.entity";
import { JourneyVariant } from "../entities/journey.variant.entity";

/**
 * Service that uses HAFAS to plan journeys.
 */
@Injectable()
export class JourneysService {

  constructor(
    @Inject(HAFAS_CLIENT) private readonly hafas: HafasClient,
    private readonly apiService: ApiService
  ) { }

  /**
   * Plans and returns variants for the requested journey.
   *
   * @param journeyParameters parameters for planning a journey
   * @return variants for the requested journey
   */
  async planJourney(journeyParameters: PlanJourneyDto): Promise<JourneyVariant[]> {
    const fromLocation = this.extractLocation(journeyParameters.from);
    const toLocation = this.extractLocation(journeyParameters.to);

    const result = await this.apiService.tripRequestClient().queryTrip({
      originPointId: fromLocation as string,
      destinationPointId: toLocation as string
    });

    return result.journeys?.map(j => ({
      journey: {
        legs: j.legs?.map(l => ({
          walking: l.transportation?.product?.name === "footpath",
          line: {
            name: l.transportation?.name,
            type: "line"
          },
          direction: l.destination?.name ?? ""
        })) || [],
        type: "journey",
      },
      updatedAt: Date.now()
    })) || [];
  }

  private extractLocation(journeyLocation: (JourneyStopStationIdDto | JourneyUserLocationDto)): string | Location {
    return (journeyLocation as JourneyStopStationIdDto).stopStationId
      ?? FPTFSupport.createFPTFLocation(journeyLocation as JourneyUserLocationDto);
  }

  /**
   * Refreshes (receives updated data of) a journey that has been planned before.
   *
   * @param refreshToken token of journey to refresh
   * @return refreshed journey
   */
  refreshJourney(refreshToken: string): Promise<JourneyVariant> {
    // Depending on 'hafas-client' profile refreshJourney could not be present.
    if (this.hafas.refreshJourney === undefined) {
      throw new HttpException("Refreshing journey is not supported.", HttpStatus.BAD_REQUEST);
    }

    const hafasOptions: RefreshJourneyOptions = {
      language: HAFAS_LANGUAGE
    };

    return this.hafas
      .refreshJourney(refreshToken, hafasOptions)
      .then(FPTFSupport.createJourneyVariantFromFPTFJourneyWithRealtimeData);
  }

  /**
   * Searches and returns available locations matching the given query.
   *
   * @param locationQuery query for searching locations
   * @return locations matching the query
   */
  async searchLocations(locationQuery: string): Promise<JourneyLocation[]> {
    const result = await this.apiService.stopFinderClient().findStopByName({ search: locationQuery });
    return result.locations?.map(l => ({
      location: {
        type: "stop",
        id: l.id,
        name: l.name
      }
    })) || [];

    const hafasOptions: LocationsOptions = {
      language: HAFAS_LANGUAGE,
      results: 5,
    };

    return this.hafas
      .locations(locationQuery, hafasOptions)
      .then(FPTFSupport.createJourneyLocationsFromFPTFLocations);
  }

}
