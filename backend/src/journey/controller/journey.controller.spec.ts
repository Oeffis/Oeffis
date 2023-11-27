import { Test, TestingModule } from "@nestjs/testing";
import { UnavailableLegStats, UnavailableReason } from "historicData/dto/legStats.dto";
import { DelayStatsService } from "historicData/service/delay-stats.service";
import { Journey } from "journey/entity/journey.entity";
import { LocationFinderModule } from "locationFinder/locationFinder.module";
import { LocationType } from "vrr/entity/locationType.entity";
import { VrrModule } from "vrr/vrr.module";
import { FootpathModule } from "../../footpath/footpath.module";
import { Location } from "../../locationFinder/entity/location.entity";
import { JourneyRequestDto } from "../dto/journeyRequest.dto";
import { LegType } from "../entity/leg.entity";
import { JourneyService } from "../service/journey.service";
import { JourneyMapperService } from "../service/mapper/journeyMapper.service";
import { JourneyController } from "./journey.controller";

const LOCATION1: Location = {
  id: "de:05513:5613:91:7",
  name: "Gelsenkirchen Hbf",
  type: LocationType.platform,
  details: {
    shortName: "7",
    coordinates: {
      latitude: 5288910,
      longitude: 790718
    },
    parent: {
      id: "de:05513:5613",
      name: "Gelsenkirchen Hbf",
      type: LocationType.stop,
      details: {
        coordinates: {
          latitude: 5288900,
          longitude: 790614
        },
        parent: {
          id: "placeID:5513000:9",
          name: "Gelsenkirchen",
          type: LocationType.locality,
          details: {}
        }
      }
    }
  }
};

const LOCATION2: Location = {
  id: "de:05916:7590:91:5",
  name: "Wanne-Eickel Hbf",
  type: LocationType.platform,
  details: {
    shortName: "2",
    coordinates: {
      latitude: 5284181,
      longitude: 797752
    },
    parent: {
      id: "de:05916:7590",
      name: "Wanne-Eickel Hbf",
      type: LocationType.stop,
      details: {
        coordinates: {
          latitude: 5284190,
          longitude: 797691
        },
        parent: {
          id: "placeID:5916000:5",
          name: "Herne",
          type: LocationType.locality,
          details: {}
        }
      }
    }
  }
};

let controller: JourneyController;
let app: TestingModule;

beforeEach(async () => {
  app = await Test.createTestingModule({
    providers: [JourneyService, JourneyMapperService, {
      provide: DelayStatsService,
      useValue: {
        getLegStats: vi.fn()
      }
    }],
    controllers: [JourneyController],
    imports: [VrrModule, LocationFinderModule, FootpathModule]
  }).compile();

  controller = app.get<JourneyController>(JourneyController);
  app.get<JourneyController>(JourneyController);
});

it("should query trip", async () => {
  const mockAlternatives: Journey[] = [
    {
      interchanges: 0,
      legs: [
        {
          origin: {
            ...LOCATION1,
            departureTimePlanned: new Date("2023-08-29T10:50:00.000Z"),
            departureTimeEstimated: new Date("2023-08-29T10:50:00.000Z")
          },
          destination: {
            ...LOCATION2,
            arrivalTimePlanned: new Date("2023-08-29T10:54:00.000Z"),
            arrivalTimeEstimated: new Date("2023-08-29T10:54:00.000Z")
          },
          type: LegType.transportation,
          transportation: {
            id: "",
            name: "Regionalzug RE2",
            line: "RE2",
            destination: LOCATION2,
            operator: "DB Regio Nrw",
            hints: [
              "Linie RE2: Fahrradmitnahme begrenzt möglich",
              "Linie RE2: Fahrzeuggebundene Einstiegshilfe vorhanden",
              "Linie RE2: rollstuhltaugliches WC"
            ]
          },
          details: {
            duration: 240,
            coords: [
              { latitude: 51.7, longitude: 7.1 }
            ],
            infos: [],
            stopSequence: [],
            interchange: undefined
          },
          delayStats: unavailableLegStats()
        }
      ]
    }
  ];

  vi.spyOn(app.get(JourneyService), "queryJourney").mockResolvedValue(mockAlternatives);
  const requestBody: JourneyRequestDto = {
    originId: "de:02000:100513",
    destinationId: "de:11011:8089",
    departure: new Date("2020-12-24T12:00:00.000Z"),
    asArrival: false
  };

  const response = await controller.queryJourney(requestBody);

  expect(response).toEqual(mockAlternatives);
});

function unavailableLegStats(): UnavailableLegStats {
  return {
    reason: UnavailableReason.noData,
    areAvailable: false
  };
}
