import { Journeys, JourneyWithRealtimeData, Location, Station, Stop } from "hafas-client";
import { JourneyUserLocationDto } from "../journeys/dto/journey.location.dto";
import { JourneyLocation } from "../journeys/entities/journey.location.entity";
import { JourneyVariant } from "../journeys/entities/journey.variant.entity";

/**
 * Supplies some supporting functionality to work with "Friendly Public Transport Format" (FPTF).
 */
export class FPTFSupport {

  /**
   * Creates a simple (address) location using FPTF format.
   *
   * @param location location
   */
  static createFPTFLocation(location: JourneyUserLocationDto): Location {
    return <Location>{
      type: "location",
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude
    };
  }

  /**
   * Creates {@link JourneyLocation} instances from locations in FPTF format. If no location is provided, an empty
   * array will be returned.
   *
   * @param locations locations (FTPF)
   */
  static createJourneyLocationsFromFPTFLocations(locations: readonly (Location | Station | Stop)[]): JourneyLocation[] {
    return locations.map(location =>
      <JourneyLocation>{
        location: location
      });
  }

  /**
   * Creates {@link JourneyVariant} instances from journeys in FPTF format. If no journey is included within given
   * journeys object, an empty array will be returned.
   *
   * @param journeys journeys (FPTF)
   */
  static createJourneyVariantsFromFPTFJourneys(journeys: Journeys): JourneyVariant[] {
    return journeys.journeys
      ?.map(journey =>
          <JourneyVariant>{
            journey: journey,
            updatedAt: journeys.realtimeDataUpdatedAt
          })
      ?? [];
  }

  /**
   * Creates a {@link JourneyVariant} instance from a journey with realtime data in FPTF format.
   *
   * @param journey journey with realtime data (FPTF)
   */
  static createJourneyVariantFromFPTFJourneyWithRealtimeData(journey: JourneyWithRealtimeData): JourneyVariant {
    return <JourneyVariant>{
      journey: journey.journey,
      updatedAt: journey.realtimeDataUpdatedAt
    };
  }

}
