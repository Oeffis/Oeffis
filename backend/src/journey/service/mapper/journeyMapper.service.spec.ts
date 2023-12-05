// Needed to mock private field behaviour.
/* eslint-disable @typescript-eslint/dot-notation */
import {
  Journey as VrrJourney,
  JourneyLocationElement,
  Leg as VrrLeg,
  LocationType as VrrLocationType
} from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { UnavailableDelayStats, UnavailableReason } from "historicData/dto/legStats.dto";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { DelayStatsService } from "historicData/service/delay-stats.service";
import { Repository } from "typeorm";
import { Footpath } from "../../../footpath/entity/footpath.entity";
import { FootpathMapperService } from "../../../footpath/service/mapper/footpathMapper.service";
import { Location } from "../../../locationFinder/entity/location.entity";
import {
  LocationCoordinatesMapperService
} from "../../../locationFinder/service/mapper/locationCoordinatesMapper.service";
import { LocationMapperService } from "../../../locationFinder/service/mapper/locationMapper.service";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { ApiService } from "../../../vrr/service/api.service";
import { Journey } from "../../entity/journey.entity";
import { LegDestinationLocation, LegOriginLocation } from "../../entity/journeyLocation.entity";
import { LegType } from "../../entity/leg.entity";
import { LegDetails } from "../../entity/legDetails.entity";
import { Transportation } from "../../entity/transportation.entity";
import { JourneyMapperService } from "./journeyMapper.service";

const LOCATION: Location = {
  id: "de:05513:5613",
  name: "Gelsenkirchen, Hbf",
  type: LocationType.stop,
  details: {
    shortName: "", coordinates: { latitude: 51.50, longitude: 7.10 },
    parent: { id: "placeID:5513000:9", name: "Gelsenkirchen", type: LocationType.locality, details: {} }
  }
} as Location;
const LEG_ORIGIN: LegOriginLocation = {
  ...LOCATION,
  departureTimePlanned: new Date("2023-08-29T17:02:00.000Z"),
  departureTimeEstimated: new Date("2023-08-29T17:04:00.000Z")
} as LegOriginLocation;
const LEG_DESTINATION: LegDestinationLocation = {
  ...LOCATION,
  arrivalTimePlanned: new Date("2023-08-29T18:02:00.000Z"),
  arrivalTimeEstimated: new Date("2023-08-29T18:02:00.000Z")
} as LegDestinationLocation;
const TRANSPORTATION: Transportation = {
  id: "ddb:90E43: :R:j23",
  name: "Regionalzug RB43",
  line: "RB43",
  destination: { id: "20003868", name: "Dorsten Bf", type: LocationType.stop },
  operator: "DB Regio AG NRW",
  hints: []
} as Transportation;
const FOOTPATH: Footpath = {
  totalDistance: 350,
  totalDuration: 460
} as Footpath;
const LEG_DETAILS: LegDetails = {
  duration: 360,
  infos: [],
  interchange: undefined,
  stopSequence: [],
  coords: []
} as LegDetails;

let mapper: JourneyMapperService;

beforeEach(() => {
  const apiService = new ApiService();
  vi.spyOn(apiService, "mapVrrLocationType")
    .mockImplementation((vrrLocation) =>
      vrrLocation === VrrLocationType.Stop
        ? LocationType.stop
        : LocationType.unknown);

  const footpathMapper = new FootpathMapperService();
  vi.spyOn(footpathMapper, "checkVrrFootpathIntegrity")
    .mockReturnValue(true);
  vi.spyOn(footpathMapper, "mapVrrFootpath")
    .mockReturnValue(FOOTPATH);

  const delayStatsService = new DelayStatsService(undefined as unknown as Repository<DelayEntry>);
  vi.spyOn(delayStatsService, "getPartialRouteStats")
    .mockReturnValue(Promise.resolve(unavailableLegStats()));

  mapper =
    new JourneyMapperService(
      apiService,
      new LocationCoordinatesMapperService(),
      footpathMapper,
      new LocationMapperService(apiService, new LocationCoordinatesMapperService()),
      delayStatsService
    );

  vi.spyOn(mapper["journeyLocationMapper"], "checkVrrJourneyLocationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(mapper["journeyLocationMapper"], "checkVrrLegOriginLocationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(mapper["journeyLocationMapper"], "checkVrrLegDestinationLocationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(mapper["journeyLocationMapper"], "mapLegOriginLocation")
    .mockReturnValue(LEG_ORIGIN);
  vi.spyOn(mapper["journeyLocationMapper"], "mapLegDestinationLocation")
    .mockReturnValue(LEG_DESTINATION);

  vi.spyOn(mapper["transportationMapper"], "checkVrrTransportationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(mapper["transportationMapper"], "mapVrrTransportation")
    .mockReturnValue(TRANSPORTATION);

  vi.spyOn(mapper["legDetailsMapper"], "checkVrrLegDetailsIntegrity")
    .mockReturnValue(true);
  vi.spyOn(mapper["legDetailsMapper"], "mapVrrLegDetails")
    .mockReturnValue(LEG_DETAILS);
});

it.each([
  ["legs undefined", vrrJourney(0, undefined), false],
  ["legs empty", vrrJourney(0, []), false],
  ["origin undefined", vrrJourney(0, [vrrJourneyLeg(undefined, {})]), false],
  ["destination undefined", vrrJourney(0, [vrrJourneyLeg({}, undefined)]), false],
  ["origin+destination undefined", vrrJourney(1,
    [vrrJourneyLegStub(), vrrJourneyLeg()]), false],
  ["valid journey", vrrJourney(2,
    [vrrJourneyLegStub(), vrrJourneyLegStub(), vrrJourneyLegStub()]), true]
])("check journey/leg: %s.", (_descr, vrrJourney, expectedResult) => {
  // Given
  // When
  const checkResult = mapper.checkVrrJourneyIntegrity(vrrJourney);
  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  { validStops: true, validOrigDest: true, validTransport: true, validFoot: true, validDetails: true, result: true },
  { validStops: true, validOrigDest: true, validTransport: true, validFoot: true, validDetails: false, result: false },
  { validStops: true, validOrigDest: true, validTransport: true, validFoot: false, validDetails: true, result: false },
  { validStops: true, validOrigDest: true, validTransport: false, validFoot: true, validDetails: true, result: false },
  { validStops: true, validOrigDest: false, validTransport: true, validFoot: true, validDetails: true, result: false }
])("process mappers' result ($validStops, $validOrigDest, $validTransport, $validFoot, $validDetails).", (
  { validOrigDest, validTransport, validFoot, validDetails, result }
) => {
  // Given
  const journey: VrrJourney =
    vrrJourney(2, [vrrJourneyTransportationLeg(), vrrJourneyFootpathLeg(), vrrJourneyTransportationLeg()]);

  vi.spyOn(mapper["journeyLocationMapper"], "checkVrrLegOriginLocationIntegrity")
    .mockReturnValueOnce(validOrigDest);
  vi.spyOn(mapper["journeyLocationMapper"], "checkVrrLegDestinationLocationIntegrity")
    .mockReturnValueOnce(validOrigDest);
  vi.spyOn(mapper["transportationMapper"], "checkVrrTransportationIntegrity")
    .mockReturnValueOnce(validTransport);
  vi.spyOn(mapper["footpathMapper"], "checkVrrFootpathIntegrity")
    .mockReturnValueOnce(validFoot);
  vi.spyOn(mapper["legDetailsMapper"], "checkVrrLegDetailsIntegrity")
    .mockReturnValueOnce(validDetails);

  // When
  const checkResult = mapper.checkVrrJourneyIntegrity(journey);

  // Then
  expect(checkResult).toBe(result);
});

it("map vrr journeys with all fields given.", async () => {
  // Given
  const vrrJourneys: VrrJourney[] = [
    vrrJourney(2,
      [vrrJourneyTransportationLeg(), vrrJourneyFootpathLeg(), vrrJourneyTransportationLeg()]),
    vrrJourney(0,
      [vrrJourneyTransportationLeg()]),
    vrrJourney(1,
      [vrrJourneyTransportationLeg(), vrrJourneyGesicherterAnschlussLeg(), vrrJourneyTransportationLeg()]),
    vrrJourney(1,
      [vrrJourneyTransportationLeg(), vrrJourneyFootpathLeg()])
  ];

  const expectedJourneys: Journey[] = [
    {
      interchanges: 2, legs: [
        {
          origin: LEG_ORIGIN,
          destination: LEG_DESTINATION,
          type: LegType.transportation,
          details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.footpath, details: LEG_DETAILS,
          footpath: FOOTPATH
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        }
      ]
    },
    {
      interchanges: 0, legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        }
      ]
    },
    {
      interchanges: 1, legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        }
      ]
    },
    {
      interchanges: 1, legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.footpath, details: LEG_DETAILS,
          footpath: FOOTPATH
        }
      ]
    }
  ];

  // When
  const mappedJourneys = await mapper.mapVrrJourneys(vrrJourneys);

  // Then
  expect(mappedJourneys).toEqual(expectedJourneys);
});

it("map vrr journey with missing optional fields.", async () => {
  // Given
  const vrrJourneys: VrrJourney[] = [
    vrrJourney(undefined, [vrrJourneyTransportationLeg(), vrrJourneyTransportationLeg()])
  ];

  const expectedJourneys: Journey[] = [
    {
      interchanges: 1, legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION, type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        }
      ]
    }
  ];

  // When
  const mappedJourneys = await mapper.mapVrrJourneys(vrrJourneys);

  // Then
  expect(mappedJourneys).toEqual(expectedJourneys);
});

it("do not map invalid vrr journeys.", async () => {
  // Given
  const vrrJourneys: VrrJourney[] = [
    vrrJourney(0, undefined),
    vrrJourney(1, [vrrJourneyTransportationLeg(), vrrJourneyTransportationLeg()])
  ];

  const expectedJourneys: Journey[] = [
    {
      interchanges: 1, legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          delayStats: unavailableLegStats()
        }
      ]
    }
  ];

  // When
  const mappedJourneys = await mapper.mapVrrJourneys(vrrJourneys);

  // Then
  expect(mappedJourneys).toEqual(expectedJourneys);
});

function vrrJourney(
  interchanges?: number,
  legs?: VrrLeg[]
): VrrJourney {

  return {
    interchanges: interchanges,
    legs: legs
  } as VrrJourney;
}

function vrrJourneyLegStub(): VrrLeg {
  return {
    origin: {},
    destination: {}
  } as VrrLeg;
}

function vrrJourneyLeg(
  origin?: JourneyLocationElement,
  destination?: JourneyLocationElement
): VrrLeg {
  return {
    origin: origin,
    destination: destination
  } as VrrLeg;
}

function vrrJourneyTransportationLeg(): VrrLeg {
  return {
    ...vrrJourneyLegStub(),
    transportation: {
      product: {
        id: 8,
        class: 13,
        name: "Regionalzug",
        iconId: 6
      }
    }
  } as VrrLeg;
}

function vrrJourneyFootpathLeg(): VrrLeg {
  return {
    ...vrrJourneyLegStub(),
    transportation: {
      product: {
        class: 99,
        name: "footpath",
        iconId: 99
      }
    }
  } as VrrLeg;
}

function vrrJourneyGesicherterAnschlussLeg(): VrrLeg {
  return {
    ...vrrJourneyLegStub(),
    transportation: {
      product: {
        name: "gesicherter Anschluss",
        iconId: 98
      }
    }
  } as VrrLeg;
}

function unavailableLegStats(): UnavailableDelayStats {
  return {
    areAvailable: false,
    reason: UnavailableReason.noData
  };
}
