import { assert } from "vitest";
import { Footpath } from "../../../footpath/entity/footpath.entity";
import { JourneyStats } from "../../../historicData/dto/journeyStats.dto";
import { LegStats } from "../../../historicData/dto/legStats.dto";
import { UnavailableReason, UnavailableStats } from "../../../historicData/dto/maybeStats.dto";
import { HistoricDataService } from "../../../historicData/service/historicData.service";
import { HistoricDataProcessorService } from "../../../historicData/service/historicDataProcessor.service";
import { HistoricDataQueryRunner } from "../../../historicData/service/historicDataQueryRunner.service";
import { ParentLocation } from "../../../locationFinder/entity/location.entity";
import { LocationMapperService } from "../../../locationFinder/service/mapper/locationMapper.service";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { FootpathLeg, LegType, TransportationLeg } from "../../entity/leg.entity";
import { LegInterchange } from "../../entity/legInterchange.entity";
import { Transportation } from "../../entity/transportation.entity";
import { JourneyLocationMapperService } from "./journeyLocationMapper.service";
import { FOOTPATH, LEG_DESTINATION, LEG_DETAILS, LEG_ORIGIN, TRANSPORTATION } from "./journeyMapper.service.spec";
import { JourneyStatsFactoryService, TransportationLegWithoutStats } from "./journeyStatsFactory.service";

const STOP_PARENT = {
  id: "de:05513:5613",
  name: "Gelsenkirchen, Hbf",
  type: LocationType.stop,
  details: {}
} as ParentLocation;
const TRANSPORTATION2 = {
  id: "ddb:90E34: :R:j23",
  name: "Regionalzug RB34",
  line: "RB34",
  destination: { id: "20003868", name: "Dorsten Bf", type: LocationType.stop },
  operator: "DB Regio AG NRW",
  hints: []
} as Transportation;
const LEG_INTERCHANGE = {
  footpath: {
    totalDuration: 250,
    totalDistance: undefined
  } as Footpath
} as LegInterchange;

const historicDataService: HistoricDataService =
  new HistoricDataService(undefined as unknown as HistoricDataQueryRunner);
const historicDataProcessor: HistoricDataProcessorService = new HistoricDataProcessorService();
let factory: JourneyStatsFactoryService;

beforeEach(() => {
  vi.spyOn(historicDataService, "getDelayStatsAtStation")
    .mockReturnValue(Promise.resolve(unavailableStats()));
  vi.spyOn(historicDataService, "getInterchangeReachableStat")
    .mockReturnValue(Promise.resolve(unavailableStats()));
  vi.spyOn(historicDataService, "getCancellationStat")
    .mockReturnValue(Promise.resolve(unavailableStats()));

  const journeyLocationMapper =
    new JourneyLocationMapperService(undefined as unknown as LocationMapperService);
  vi.spyOn(journeyLocationMapper, "getStopParent")
    .mockReturnValue(STOP_PARENT);

  factory = new JourneyStatsFactoryService(
    historicDataService,
    historicDataProcessor,
    journeyLocationMapper);
});

it.each([
  ["one mapped footpath leg",
    [footpathLeg()],
    [footpathLeg()]],
  ["one mapped transportation leg",
    [transportationLegWithoutStats()],
    [transportationLegWithStats()]],
  ["mapped transportation + footpath leg",
    [transportationLegWithoutStats(), footpathLeg()],
    [transportationLegWithStats(), footpathLeg()]]
])("enrich legs without interchanges: %s", async (_descr, mappedLegs, expectedEnrichedLegs) => {
  // Given
  vi.spyOn(historicDataService, "getDelayStatsAtStation")
    .mockImplementationOnce(arg => {
      // Check if correct arguments are given.
      assert(arg.tripId === TRANSPORTATION.id
        && arg.stopId === STOP_PARENT.id,
        "Validate trip delay stats options.");

      return Promise.resolve(unavailableStats());
    });
  vi.spyOn(historicDataService, "getCancellationStat")
    .mockImplementationOnce(arg => {
      // Check if correct arguments are given.
      assert(arg.tripId === TRANSPORTATION.id
        && arg.originStopId === STOP_PARENT.id
        && arg.destinationStopId === STOP_PARENT.id,
        "Validate cancellation stats options.");

      return Promise.resolve(unavailableStats());
    });

  // When
  const enrichedLegs = await factory.enrichLegsWithStats(mappedLegs);

  // Then
  expect(enrichedLegs).toEqual(expectedEnrichedLegs);
});

it.each([
  ["mapped legs with interchange",
    [transportationLegWithoutStats(LEG_INTERCHANGE), transportationLegWithoutStats2()],
    250, [transportationLegWithStats(LEG_INTERCHANGE), transportationLegWithStats2()]],
  ["mapped legs with interchange but no footpath time (use fallback)",
    [footpathLeg(), transportationLegWithoutStats(), transportationLegWithoutStats2()],
    0, [footpathLeg(), transportationLegWithStats(), transportationLegWithStats2()]],
  ["mapped legs with footpath in interchange",
    [transportationLegWithoutStats(), footpathLeg(), transportationLegWithoutStats2()],
    460, [transportationLegWithStats(), footpathLeg(), transportationLegWithStats2()]]
])("enrich legs with interchanges: %s", async (_descr,
                                               mappedLegs,
                                               expectedFootpathTime,
                                               expectedEnrichedLegs) => {
  // Given
  vi.spyOn(historicDataService, "getInterchangeReachableStat")
    .mockImplementationOnce(arg => {
      // Check if correct arguments are given.
      assert(arg.delayAtCurrentTripDestinationOptions.tripId === TRANSPORTATION.id
        && arg.delayAtCurrentTripDestinationOptions.stopId === STOP_PARENT.id,
        "validate current trip delay stats options.");
      assert(arg.delayAtNextTripOriginOptions.tripId === TRANSPORTATION2.id
        && arg.delayAtNextTripOriginOptions.stopId === STOP_PARENT.id,
        "validate next trip delay stats options.");

      assert(arg.interchangeFootpathTime === expectedFootpathTime,
        "Validate footpath time (expected: " + expectedFootpathTime + ", actual: " + arg.interchangeFootpathTime + ").");

      return Promise.resolve(unavailableStats());
    });

  // When
  const enrichedLegs = await factory.enrichLegsWithStats(mappedLegs);

  // Then
  expect(enrichedLegs).toEqual(expectedEnrichedLegs);
});

it.each([
  ["mapped footpath leg only",
    [footpathLeg()],
    []],
  ["mapped mixed legs",
    [transportationLegWithStats(), footpathLeg(), transportationLegWithStats()],
    [unavailableLegStats(), unavailableLegStats()]]
])("create journey stats from leg stats: %s.", (_descr, legsWithStats, containedLegStats) => {
  // Given
  const aggregatedDelayStatsSpy =
    vi.spyOn(historicDataProcessor, "getAggregatedDelayStats")
      .mockReturnValue(unavailableStats());
  const aggregatedInterchangeReachableStatSpy =
    vi.spyOn(historicDataProcessor, "getAggregatedInterchangeReachableStat")
      .mockReturnValue(unavailableStats());
  const aggregatedCancellationStatSpy =
    vi.spyOn(historicDataProcessor, "getAggregatedCancellationStat")
      .mockReturnValue(unavailableStats());

  const expectedJourneyStats = {
    aggregatedDelayStats: unavailableStats(),
    aggregatedInterchangeReachableStat: unavailableStats(),
    aggregatedCancellationStat: unavailableStats()
  } as JourneyStats;

  // When
  const journeyStats = factory.createJourneyStats(legsWithStats);

  // Then
  expect(journeyStats).toEqual(expectedJourneyStats);
  expect(aggregatedDelayStatsSpy).toHaveBeenCalledWith(containedLegStats);
  expect(aggregatedInterchangeReachableStatSpy).toHaveBeenCalledWith(containedLegStats);
  expect(aggregatedCancellationStatSpy).toHaveBeenCalledWith(containedLegStats);
});

function unavailableStats(): UnavailableStats {

  return {
    reason: UnavailableReason.noData,
    status: "unavailable"
  };
}

function unavailableLegStats(): LegStats {

  return {
    originDelayStats: unavailableStats(),
    destinationDelayStats: unavailableStats(),
    interchangeReachableStat: unavailableStats(),
    cancellationStat: unavailableStats()
  } as LegStats;
}

function transportationLegWithoutStats(
  interchange?: LegInterchange
): TransportationLegWithoutStats {
  const legDetails = {
    ...LEG_DETAILS,
    interchange: interchange
  };

  return {
    origin: LEG_ORIGIN,
    destination: LEG_DESTINATION,
    type: LegType.transportation,
    details: legDetails,
    transportation: TRANSPORTATION
  } as TransportationLegWithoutStats;
}

function transportationLegWithoutStats2(): TransportationLegWithoutStats {

  return {
    origin: LEG_ORIGIN,
    destination: LEG_DESTINATION,
    type: LegType.transportation,
    details: LEG_DETAILS,
    transportation: TRANSPORTATION2
  } as TransportationLegWithoutStats;
}

function transportationLegWithStats(
  interchange?: LegInterchange
): TransportationLeg {
  const legDetails = {
    ...LEG_DETAILS,
    interchange: interchange
  };

  return {
    origin: LEG_ORIGIN,
    destination: LEG_DESTINATION,
    type: LegType.transportation,
    details: legDetails,
    transportation: TRANSPORTATION,
    legStats: unavailableLegStats()
  } as TransportationLeg;
}

function transportationLegWithStats2(
  interchange?: LegInterchange
): TransportationLeg {
  const legDetails = {
    ...LEG_DETAILS,
    interchange: interchange
  };

  return {
    origin: LEG_ORIGIN,
    destination: LEG_DESTINATION,
    type: LegType.transportation,
    details: legDetails,
    transportation: TRANSPORTATION2,
    legStats: unavailableLegStats()
  } as TransportationLeg;
}

function footpathLeg(): FootpathLeg {

  return {
    origin: LEG_ORIGIN,
    destination: LEG_DESTINATION,
    type: LegType.footpath,
    details: LEG_DETAILS,
    footpath: FOOTPATH
  } as FootpathLeg;
}
