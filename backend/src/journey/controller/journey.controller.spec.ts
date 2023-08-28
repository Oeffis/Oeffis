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
  const mockAlternatives = [
    {
      "legs": [
        {
          "origin": {
            "id": "de:05513:5613:91:7",
            "name": "Gelsenkirchen Hbf",
            "type": "platform",
            "details": {
              "shortName": "7",
              "parent": {
                "id": "de:05513:5613",
                "name": "Gelsenkirchen Hbf",
                "type": "stop",
                "details": {
                  "parent": {
                    "id": "placeID:5513000:9",
                    "name": "Gelsenkirchen",
                    "type": "locality",
                    "details": {}
                  },
                  "latitude": 5288900,
                  "longitude": 790614
                }
              },
              "latitude": 5288910,
              "longitude": 790718
            },
            "arrival": {},
            "departure": {
              "timeEstimated": "2023-08-28T12:50:00Z",
              "timePlanned": "2023-08-28T12:50:00Z"
            }
          },
          "destination": {
            "id": "de:05916:7590:91:5",
            "name": "Wanne-Eickel Hbf",
            "type": "platform",
            "details": {
              "shortName": "2",
              "parent": {
                "id": "de:05916:7590",
                "name": "Wanne-Eickel Hbf",
                "type": "stop",
                "details": {
                  "parent": {
                    "id": "placeID:5916000:5",
                    "name": "Herne",
                    "type": "locality",
                    "details": {}
                  },
                  "latitude": 5284190,
                  "longitude": 797691
                }
              },
              "latitude": 5284181,
              "longitude": 797752
            },
            "arrival": {
              "timeEstimated": "2023-08-28T12:54:00Z",
              "timePlanned": "2023-08-28T12:54:00Z"
            },
            "departure": {}
          },
          "transportation": {
            "name": "Regionalzug RE2",
            "trips": []
          },
          "details": {
            "duration": 240
          }
        }
      ]
    }
  ];

  vi.spyOn(app.get(JourneyService), "queryJourney").mockResolvedValue(mockAlternatives);
  const requestBody = {
    "originId": "de:02000:100513",
    "destinationId": "de:11011:8089",
    "departure": new Date("2020-12-24T12:00:00.000Z")
  };

  const response = await controller.queryJourney(requestBody);

  expect(response).toEqual(mockAlternatives);
});
