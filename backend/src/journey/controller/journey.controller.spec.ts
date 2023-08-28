import { Test, TestingModule } from "@nestjs/testing";
import { VrrModule } from "vrr/vrr.module";
import { JourneyService } from "../service/journey.service";
import { JourneyController } from "./journey.controller";

let controller: JourneyController;
let app: TestingModule;

beforeEach(async () => {
  app = await Test.createTestingModule({
    controllers: [JourneyController],
    providers: [JourneyService],
    imports: [VrrModule]
  }).compile();

  controller = app.get<JourneyController>(JourneyController);
  app.get<JourneyController>(JourneyController);
});

it("should query trip", async () => {
  const mockAlternatives = {
    journeys: [{
      legs: [{
        origin: {
          name: "Hamburg Hbf",
          id: "de:02000:10051",
          latitude: 53.552,
          longitude: 10.006
        },
        destination: {
          name: "Berlin Hbf",
          id: "de:11011:8089",
          latitude: 52.525,
          longitude: 13.369
        },
        name: "ICE 123"
      }]
    }]
  };
  vi.spyOn(app.get(JourneyService), "queryJourney").mockResolvedValue(mockAlternatives);
  const requestBody = {
    "originId": "de:02000:100513",
    "destinationId": "de:11011:8089",
    "departure": new Date("2020-12-24T12:00:00.000Z")
  };

  const response = await controller.queryJourney(requestBody);

  expect(response).toEqual(mockAlternatives);
});
