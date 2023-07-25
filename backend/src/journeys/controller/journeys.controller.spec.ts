import { Test, TestingModule } from "@nestjs/testing";
import { JourneysService } from "../service/journeys.service";
import { JourneysController } from "./journeys.controller";

test("JourneysController", () => {
  let controller: JourneysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneysController,
        {
          provide: JourneysService,
          useValue: {
            planJourney: vi.fn().mockResolvedValue({}),
            refreshJourney: vi.fn().mockResolvedValue({}),
            searchLocations: vi.fn().mockResolvedValue({})
          }
        }
      ]
    }).compile();

    controller = module.get<JourneysController>(JourneysController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  // TODO Add more tests.

});
