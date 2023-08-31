import { Test, TestingModule } from "@nestjs/testing";
import { Journey } from "journey/entity/journey.entity";
import { VrrJourneysWrapperService } from "journey/service/vrrJourneysWrapper.service";
import { LocationFinderModule } from "locationFinder/locationFinder.module";
import { LocationType } from "vrr/entity/locationType.entity";
import { VrrModule } from "vrr/vrr.module";
import { JourneyService } from "../service/journey.service";
import { JourneyController } from "./journey.controller";

let controller: JourneyController;
let app: TestingModule;

beforeEach(async () => {
  app = await Test.createTestingModule({
    providers: [JourneyService, VrrJourneysWrapperService],
    controllers: [JourneyController],
    imports: [VrrModule, LocationFinderModule]
  }).compile();

  controller = app.get<JourneyController>(JourneyController);
  app.get<JourneyController>(JourneyController);
});

it("should query trip", async () => {
  const mockAlternatives: Journey[] = [
    {
      "legs": [
        {
          "origin": {
            "id": "de:05513:5613:91:7",
            "name": "Gelsenkirchen Hbf",
            "type": LocationType.platform,
            "details": {
              "shortName": "7",
              "parent": {
                "id": "de:05513:5613",
                "name": "Gelsenkirchen Hbf",
                "type": LocationType.stop,
                "details": {
                  "parent": {
                    "id": "placeID:5513000:9",
                    "name": "Gelsenkirchen",
                    "type": LocationType.locality,
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
              "estimated": new Date("2023-08-29T10:50:00.000Z"),
              "planned": new Date("2023-08-29T10:50:00.000Z")
            }
          },
          "destination": {
            "id": "de:05916:7590:91:5",
            "name": "Wanne-Eickel Hbf",
            "type": LocationType.platform,
            "details": {
              "shortName": "2",
              "parent": {
                "id": "de:05916:7590",
                "name": "Wanne-Eickel Hbf",
                "type": LocationType.stop,
                "details": {
                  "parent": {
                    "id": "placeID:5916000:5",
                    "name": "Herne",
                    "type": LocationType.locality,
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
              "estimated": new Date("2023-08-29T10:54:00.000Z"),
              "planned": new Date("2023-08-29T10:54:00.000Z")
            },
            "departure": {}
          },
          "transportation": {
            "name": "Regionalzug RE2"
          },
          "details": {
            "duration": 240,
            "infos": [],
            "hints": [
              {
                "content": "Linie RE2: Fahrradmitnahme begrenzt möglich"
              },
              {
                "content": "Linie RE2: Fahrzeuggebundene Einstiegshilfe vorhanden"
              },
              {
                "content": "Linie RE2: rollstuhltaugliches WC"
              },
              {
                "content": "Linie RE2: Achtung! Baumaßnahmen. Infos: bauinfos.deutschebahn.com"
              },
              {
                "content": "Reparatur an der Strecke"
              },
              {
                "content": "Mehrere Wagen fehlen"
              }
            ]
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
