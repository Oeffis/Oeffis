import {Test, TestingModule} from "@nestjs/testing";
import {JourneyService} from "./journey.service";

describe("JourneyService", () => {
  let service: JourneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JourneyService],
    }).compile();

    service = module.get<JourneyService>(JourneyService);
  });

  it("should return query results", () => {
    const locationQuery = "Wuppertal";

    expect(service.searchLocations(locationQuery))
      .toBeDefined(); // TODO Wie hier vernünftig asserten?
  });


});
