import { Test, TestingModule } from "@nestjs/testing";
import { HAFAS_CLIENT } from "../symbols";
import { JourneyService } from "./journey.service";

describe("JourneyService", () => {
  let service: JourneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneyService,
        {
          provide: HAFAS_CLIENT,
          useValue: {
            locations: jest.fn().mockResolvedValue([{ name: "Gelsenkirchen Hbf" }]),
          }
        }
      ],
    }).compile();

    service = module.get<JourneyService>(JourneyService);
  });

  it("should return query results", async () => {
    const locationQuery = "Wuppertal";

    expect(await service.searchLocations(locationQuery)).toContainEqual({ name: "Gelsenkirchen Hbf" });
  });
});
