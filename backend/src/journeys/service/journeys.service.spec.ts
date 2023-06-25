import { Test, TestingModule } from "@nestjs/testing";
import { HAFAS_CLIENT } from "../../symbols";
import { JourneysRequest } from "../entities/journeys.request.entity";
import { JourneysService } from "./journeys.service";

describe("JourneyService", () => {
  let service: JourneysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneysService,
        {
          provide: HAFAS_CLIENT,
          useValue: {
            journeys: jest.fn().mockResolvedValue([{
              type: "journey",
              id: "12654"
            }]),
            refreshJourney: jest.fn().mockResolvedValue([{
              type: "journey",
              id: "12654"
            }]),
            locations: jest.fn().mockResolvedValue([{
              type: "station",
              name: "Gelsenkirchen Hbf"
            }]),
          }
        }
      ],
    }).compile();

    service = module.get<JourneysService>(JourneysService);
  });

  it("Should return journey results.", async () => {
    const journeyRequest: JourneysRequest = {
      from: "5912",
      to: "6415",
    };

    expect(await service.planJourney(journeyRequest))
      .toContainEqual({
        type: "journey",
        id: "12654"
      });
  });

  it("Should refresh journey.", async () => {
    const refreshToken = "refreshToken@123";

    expect(await service.refreshJourney(refreshToken))
      .toContainEqual({
        type: "journey",
        id: "12654"
      });
  });

  it("Should return location results.", async () => {
    const locationQuery = "Gelsenkirchen";

    expect(await service.searchLocations(locationQuery))
      .toContainEqual({
        type: "station",
        name: "Gelsenkirchen Hbf"
      });
  });

});
