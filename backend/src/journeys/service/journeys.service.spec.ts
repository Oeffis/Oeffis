import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, expect, it, test, vi } from "vitest";
import { HAFAS_CLIENT } from "../../symbols";
import { JourneyStopStationIdDto, JourneyUserLocationDto } from "../dto/journey.location.dto";
import { PlanJourneyDto } from "../dto/journey.parameters.dto";
import { JourneyLocation } from "../entities/journey.location.entity";
import { JourneyVariant } from "../entities/journey.variant.entity";
import { JourneysService } from "./journeys.service";

test("JourneysService", () => {
  let service: JourneysService;

  /**
   * Creates the service and mocks the hafas-client needed by the service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneysService,
        {
          provide: HAFAS_CLIENT,
          useValue: {
            journeys: vi.fn().mockResolvedValue({
              journeys: [
                {
                  type: "journey",
                  id: "54321"
                },
                {
                  type: "journey",
                  id: "12345"
                }
              ],
              realtimeDataUpdatedAt: 125
            }),
            refreshJourney: vi.fn().mockResolvedValue({
              journey: {
                type: "journey",
                id: "12345"
              },
              realtimeDataUpdatedAt: 125
            }),
            locations: vi.fn().mockResolvedValue([
              {
                type: "station",
                name: "Gelsenkirchen Hbf"
              },
              {
                type: "stop",
                name: "Gelsenkirchen Zoo"
              }
            ]),
          }
        }
      ],
    }).compile();

    service = module.get<JourneysService>(JourneysService);
  });

  it("Should return journey variants.", async () => {
    // Given
    const journeyLocationFrom: JourneyStopStationIdDto = {
      stopStationId: "5912"
    };
    const journeyLocationTo: JourneyStopStationIdDto = {
      stopStationId: "5912"
    };

    const journeyParameters: PlanJourneyDto = {
      from: journeyLocationFrom,
      to: journeyLocationTo
    };

    // When
    const plannedVariants: JourneyVariant[] =
      await service.planJourney(journeyParameters);

    // Then
    expect(plannedVariants)
      .toEqual([
        {
          journey: {
            type: "journey",
            id: "54321"
          },
          updatedAt: 125
        },
        {
          journey: {
            type: "journey",
            id: "12345"
          },
          updatedAt: 125
        }
      ]);
  });

  it("Should return journey variants using user's location as start.", async () => {
    // Given
    const journeyLocationFrom: JourneyUserLocationDto = {
      address: "Neidenburger Str. 43, 45897 Gelsenkirchen",
      latitude: 51.574272755490284,
      longitude: 7.027275510766967
    };
    const journeyLocationTo: JourneyStopStationIdDto = {
      stopStationId: "5912"
    };

    const journeyParameters: PlanJourneyDto = {
      from: journeyLocationFrom,
      to: journeyLocationTo
    };

    // When
    const journeyVariants: JourneyVariant[] =
      await service.planJourney(journeyParameters);

    // Then
    expect(journeyVariants)
      .toEqual([
        {
          journey: {
            type: "journey",
            id: "54321"
          },
          updatedAt: 125
        },
        {
          journey: {
            type: "journey",
            id: "12345"
          },
          updatedAt: 125
        }
      ]);
  });

  it("Should return journey variants using user's location as destination.", async () => {
    // Given
    const journeyLocationFrom: JourneyStopStationIdDto = {
      stopStationId: "5912"
    };
    const journeyLocationTo: JourneyUserLocationDto = {
      address: "Neidenburger Str. 43, 45897 Gelsenkirchen",
      latitude: 51.574272755490284,
      longitude: 7.027275510766967
    };

    const journeyParameters: PlanJourneyDto = {
      from: journeyLocationFrom,
      to: journeyLocationTo
    };

    // When
    const journeyVariants: JourneyVariant[] =
      await service.planJourney(journeyParameters);

    // Then
    expect(journeyVariants)
      .toEqual([
        {
          journey: {
            type: "journey",
            id: "54321"
          },
          updatedAt: 125
        },
        {
          journey: {
            type: "journey",
            id: "12345"
          },
          updatedAt: 125
        }
      ]);
  });

  it("Should refresh journey variant.", async () => {
    // Given
    const refreshToken = "refreshToken@123";

    // When
    const journeyVariant: JourneyVariant =
      await service.refreshJourney(refreshToken);

    // Then
    expect(journeyVariant)
      .toEqual({
        journey: {
          type: "journey",
          id: "12345"
        },
        updatedAt: 125
      });
  });

  it("Should return journey locations.", async () => {
    // Given
    const locationQuery = "Gelsenkirchen";

    // Then
    const journeyLocations: JourneyLocation[] =
      await service.searchLocations(locationQuery);

    // When
    expect(journeyLocations)
      .toEqual([
        {
          location: {
            type: "station",
            name: "Gelsenkirchen Hbf"
          }
        },
        {
          location: {
            type: "stop",
            name: "Gelsenkirchen Zoo"
          }
        }
      ]);
  });

});
