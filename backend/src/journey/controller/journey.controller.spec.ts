import { Test, TestingModule } from "@nestjs/testing";
import { VrrModule } from "vrr/vrr.module";
import { JourneyService } from "../service/journey.service";
import { JourneyController } from "./journey.controller";

let app: TestingModule;

beforeEach(async () => {
  app = await Test.createTestingModule({
    controllers: [JourneyController],
    providers: [JourneyService],
    imports: [VrrModule]
  }).compile();

  app.get<JourneyController>(JourneyController);
});

/* it("should query trip", async () => {
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
  vi.spyOn(app.get(TripQueryService), "queryTrip").mockResolvedValue(mockAlternatives);
  const requestBody = {
    "origin": "de:02000:100513",
    "destination": "de:11011:8089",
    "departure": "2020-12-24T12:00:00.000Z"
  };

  const response = await controller.queryTrip(requestBody);

  expect(response).toEqual(mockAlternatives); 
}); */
