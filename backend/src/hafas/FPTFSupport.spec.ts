import { Journey, Journeys, JourneyWithRealtimeData, Location, Station, Stop } from "hafas-client";
import { JourneyUserLocationDto } from "../journeys/dto/journey.location.dto";
import { JourneyLocation } from "../journeys/entities/journey.location.entity";
import { JourneyVariant } from "../journeys/entities/journey.variant.entity";
import { FPTFSupport } from "./FPTFSupport";

describe("FPTFSupport", () => {

  it("should create FPTF location", () => {
    // Given
    const location: JourneyUserLocationDto = {
      address: "Street No, town",
      latitude: 12.34,
      longitude: 4.32
    };

    // When
    const fptfLocation: Location =
      FPTFSupport.createFPTFLocation(location);

    // Then
    expect(fptfLocation)
      .toEqual(
        <Location>{
          type: "location",
          address: "Street No, town",
          latitude: 12.34,
          longitude: 4.32
        });
  });

  it("should create journey locations from FPTF locations", () => {
    // Given
    const locations: (Location | Station | Stop)[] = [
      <Location>{
        type: "location",
        address: "address 1, town A",
        latitude: 12.34,
        longitude: 4.32,
        altitude: 24
      },
      <Station>{
        type: "station",
        name: "Wuppertal Hbf"
      },
      <Stop>{
        type: "stop",
        name: "Essen-Dellwig Ost"
      }
    ];

    // When
    const journeyLocations: JourneyLocation[] =
      FPTFSupport.createJourneyLocationsFromFPTFLocations(locations);

    // Then
    expect(journeyLocations)
      .toEqual([
        <JourneyLocation>{
          location: locations[0]
        },
        <JourneyLocation>{
          location: locations[1]
        },
        <JourneyLocation>{
          location: locations[2]
        }
      ]);
  });

  it("should create journey variants from FPTF journeys", () => {
    // Given
    const journeys: Journeys =
      <Journeys>{
        journeys: [
          <Journey>{
            type: "journey",
            legs: [],
            refreshToken: "my token 1"
          },
          <Journey>{
            type: "journey",
            legs: [],
            refreshToken: "my token 2"
          }
        ],
        realtimeDataUpdatedAt: 12345
      }
    ;

    // When
    const journeyVariants: JourneyVariant[] =
      FPTFSupport.createJourneyVariantsFromFPTFJourneys(journeys);

    // Then
    expect(journeyVariants)
      .toEqual([
        <JourneyVariant>{
          journey: <Journey>{
            type: "journey",
            legs: [],
            refreshToken: "my token 1"
          },
          updatedAt: 12345
        },
        <JourneyVariant>{
          journey: <Journey>{
            type: "journey",
            legs: [],
            refreshToken: "my token 2"
          },
          updatedAt: 12345
        }
      ]);
  });

  it("should create journey variant from FPTF journey with realtime data", () => {
    // Given
    const journey: JourneyWithRealtimeData =
      <JourneyWithRealtimeData>{
        journey:
          <Journey>{
            type: "journey",
            legs: [],
            refreshToken: "my token"
          },
        realtimeDataUpdatedAt: 12345
      }
    ;

    // When
    const journeyVariant: JourneyVariant =
      FPTFSupport.createJourneyVariantFromFPTFJourneyWithRealtimeData(journey);

    // Then
    expect(journeyVariant)
      .toEqual(
        <JourneyVariant>{
          journey: <Journey>{
            type: "journey",
            legs: [],
            refreshToken: "my token"
          },
          updatedAt: 12345
        }
      );
  });


});
