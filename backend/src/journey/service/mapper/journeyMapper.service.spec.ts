// Needed to mock private field behaviour.
/* eslint-disable @typescript-eslint/dot-notation */
import {
  Journey as VrrJourney,
  JourneyLocationElement,
  Leg as VrrLeg
} from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { HistoricDataService } from "historicData/service/historicData.service";
import { Footpath } from "../../../footpath/entity/footpath.entity";
import { FootpathMapperService } from "../../../footpath/service/mapper/footpathMapper.service";
import { JourneyStats } from "../../../historicData/dto/journeyStats.dto";
import { LegStats } from "../../../historicData/dto/legStats.dto";
import { UnavailableReason, UnavailableStats } from "../../../historicData/dto/maybeStats.dto";
import { HistoricDataProcessorService } from "../../../historicData/service/historicDataProcessor.service";
import { Location } from "../../../locationFinder/entity/location.entity";
import {
  LocationCoordinatesMapperService
} from "../../../locationFinder/service/mapper/locationCoordinatesMapper.service";
import { LocationMapperService } from "../../../locationFinder/service/mapper/locationMapper.service";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { ApiService } from "../../../vrr/service/api.service";
import { Journey } from "../../entity/journey.entity";
import { LegDestinationLocation, LegOriginLocation } from "../../entity/journeyLocation.entity";
import { FootpathLeg, LegType, TransportationLeg } from "../../entity/leg.entity";
import { LegDetails } from "../../entity/legDetails.entity";
import { Transportation } from "../../entity/transportation.entity";
import { JourneyLocationMapperService } from "./journeyLocationMapper.service";
import { JourneyMapperService } from "./journeyMapper.service";
import { JourneyStatsFactoryService, TransportationLegWithoutStats } from "./journeyStatsFactory.service";
import { LegDetailsMapperService } from "./legDetailsMapper.service";
import { TransportationMapperService } from "./transportationMapper.service";

export const LOCATION: Location = {
  id: "de:05513:5613",
  name: "Gelsenkirchen, Hbf",
  type: LocationType.stop,
  details: {
    shortName: "", coordinates: { latitude: 51.50, longitude: 7.10 },
    parent: { id: "placeID:5513000:9", name: "Gelsenkirchen", type: LocationType.locality, details: {} }
  }
} as Location;
export const LEG_ORIGIN: LegOriginLocation = {
  ...LOCATION,
  departureTimePlanned: new Date("2023-08-29T17:02:00.000Z"),
  departureTimeEstimated: new Date("2023-08-29T17:04:00.000Z")
} as LegOriginLocation;
export const LEG_DESTINATION: LegDestinationLocation = {
  ...LOCATION,
  arrivalTimePlanned: new Date("2023-08-29T18:02:00.000Z"),
  arrivalTimeEstimated: new Date("2023-08-29T18:02:00.000Z")
} as LegDestinationLocation;
export const TRANSPORTATION: Transportation = {
  id: "ddb:90E43: :R:j23",
  name: "Regionalzug RB43",
  line: "RB43",
  destination: { id: "20003868", name: "Dorsten Bf", type: LocationType.stop },
  operator: "DB Regio AG NRW",
  hints: []
} as Transportation;
export const FOOTPATH: Footpath = {
  totalDistance: 350,
  totalDuration: 460
} as Footpath;
export const LEG_DETAILS: LegDetails = {
  duration: 360,
  infos: [],
  interchange: undefined,
  stopSequence: [],
  coords: []
} as LegDetails;

let mapper: JourneyMapperService;

beforeEach(() => {
  const footpathMapper = new FootpathMapperService();
  vi.spyOn(footpathMapper, "checkVrrFootpathIntegrity")
    .mockReturnValue(true);
  vi.spyOn(footpathMapper, "mapVrrFootpath")
    .mockReturnValue(FOOTPATH);

  const transportationMapper = new TransportationMapperService(undefined as unknown as ApiService);
  vi.spyOn(transportationMapper, "checkVrrTransportationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(transportationMapper, "mapVrrTransportation")
    .mockReturnValue(TRANSPORTATION);

  const journeyLocationMapper =
    new JourneyLocationMapperService(undefined as unknown as LocationMapperService);
  vi.spyOn(journeyLocationMapper, "checkVrrJourneyLocationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(journeyLocationMapper, "checkVrrLegOriginLocationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(journeyLocationMapper, "checkVrrLegDestinationLocationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(journeyLocationMapper, "mapLegOriginLocation")
    .mockReturnValue(LEG_ORIGIN);
  vi.spyOn(journeyLocationMapper, "mapLegDestinationLocation")
    .mockReturnValue(LEG_DESTINATION);

  const legDetailsMapper = new LegDetailsMapperService(
    undefined as unknown as ApiService,
    undefined as unknown as LocationCoordinatesMapperService,
    undefined as unknown as JourneyLocationMapperService,
    undefined as unknown as FootpathMapperService);
  vi.spyOn(legDetailsMapper, "checkVrrLegDetailsIntegrity")
    .mockReturnValue(true);
  vi.spyOn(legDetailsMapper, "mapVrrLegDetails")
    .mockReturnValue(LEG_DETAILS);

  const journeyStatsFactory =
    new JourneyStatsFactoryService(
      undefined as unknown as HistoricDataService,
      undefined as unknown as HistoricDataProcessorService,
      undefined as unknown as JourneyLocationMapperService);
  vi.spyOn(journeyStatsFactory, "enrichLegsWithStats")
    .mockImplementation(async (mappedLegs) =>
      mappedLegs.map(leg => enrichLegWithUnavailableStats(leg)));
  vi.spyOn(journeyStatsFactory, "createJourneyStats")
    .mockReturnValue(unavailableJourneyStats());

  mapper =
    new JourneyMapperService(
      footpathMapper,
      transportationMapper,
      legDetailsMapper,
      journeyLocationMapper,
      journeyStatsFactory
    );
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
      interchanges: 2,
      legs: [
        {
          origin: LEG_ORIGIN,
          destination: LEG_DESTINATION,
          type: LegType.transportation,
          details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN,
          destination: LEG_DESTINATION,
          type: LegType.footpath,
          details: LEG_DETAILS,
          footpath: FOOTPATH
        },
        {
          origin: LEG_ORIGIN,
          destination: LEG_DESTINATION,
          type: LegType.transportation,
          details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        }
      ],
      journeyStats: unavailableJourneyStats()
    },
    {
      interchanges: 0,
      legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        }
      ],
      journeyStats: unavailableJourneyStats()
    },
    {
      interchanges: 1,
      legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        }
      ],
      journeyStats: unavailableJourneyStats()
    },
    {
      interchanges: 1, legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.footpath, details: LEG_DETAILS,
          footpath: FOOTPATH
        }
      ],
      journeyStats: unavailableJourneyStats()
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
    vrrJourney(undefined,
      [vrrJourneyTransportationLeg(), vrrJourneyGesicherterAnschlussLeg(), vrrJourneyTransportationLeg()])
  ];

  const expectedJourneys: Journey[] = [
    {
      interchanges: 1,
      legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION, type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        }
      ],
      journeyStats: unavailableJourneyStats()
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
    vrrJourney(0, undefined), // invalid
    vrrJourney(1, [vrrJourneyTransportationLeg(), vrrJourneyTransportationLeg()]) // valid
  ];

  const expectedJourneys: Journey[] = [
    {
      interchanges: 1,
      legs: [
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        },
        {
          origin: LEG_ORIGIN, destination: LEG_DESTINATION,
          type: LegType.transportation, details: LEG_DETAILS,
          transportation: TRANSPORTATION,
          legStats: unavailableLegStats()
        }
      ],
      journeyStats: unavailableJourneyStats()
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

function unavailableLegStats(): LegStats {

  return {
    originDelayStats: unavailableStats(),
    destinationDelayStats: unavailableStats(),
    interchangeReachableStat: unavailableStats(),
    cancellationStat: unavailableStats()
  } as LegStats;
}

function unavailableJourneyStats(): JourneyStats {
  return {
    aggregatedDelayStats: unavailableStats(),
    aggregatedInterchangeReachableStat: unavailableStats(),
    aggregatedCancellationStat: unavailableStats()
  } as JourneyStats;
}

function unavailableStats(): UnavailableStats {
  return {
    reason: UnavailableReason.noData,
    status: "unavailable"
  };
}

function enrichLegWithUnavailableStats(
  leg: TransportationLegWithoutStats | FootpathLeg
): TransportationLeg | FootpathLeg {

  return TransportationLegWithoutStats.isTransportationLeg(leg)
    ? { ...leg, legStats: unavailableLegStats() } as TransportationLeg
    : leg as FootpathLeg;
}
