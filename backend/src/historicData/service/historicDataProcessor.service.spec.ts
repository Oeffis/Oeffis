import { CancellationStat } from "../dto/cancellationStat.dto";
import { DelayStats } from "../dto/delayStats.dto";
import { InterchangeReachableStat } from "../dto/interchangeReachableStat.dto";
import { LegStats } from "../dto/legStats.dto";
import { UnavailableReason, UnavailableStats } from "../dto/maybeStats.dto";
import { HistoricDataProcessorService } from "./historicDataProcessor.service";

let historicDataProcessor: HistoricDataProcessorService;

beforeEach(() => {
  historicDataProcessor = new HistoricDataProcessorService();
});

it("aggregate leg delay stats to single delay stat.", () => {
  // Given
  const allLegStats: LegStats[] = [
    legStats(delayStats(8, 12, 0, 4), delayStats(10, 14, 1, 3)),
    legStats(delayStats(1, 4, 0, 2), delayStats(2, 3, 1, 1)),
    legStats(delayStats(0, 0, 0, 0), delayStats(1, 5, 0, 1))
  ];

  // noinspection PointlessArithmeticExpressionJS
  const expectedAggregatedStats: DelayStats = {
    status: "available",
    averageDelay: (8 + 10 + 1 + 2 + 0 + 1) / 6,
    maxDelay: 14,
    minDelay: 0,
    standardDeviation: Math.sqrt((4 * 4 + 3 * 3 + 2 * 2 + 1 * 1 + 0 * 0 + 1 * 1) / 6)
  };

  // When
  const aggregatedStats = historicDataProcessor.getAggregatedDelayStats(allLegStats);

  // Then
  expect(aggregatedStats).toEqual(expectedAggregatedStats);
});

it("aggregate leg delay stats with some missing ones to single delay stat", () => {
  // Given
  const allLegStats: LegStats[] = [
    legStats(undefined, delayStats(10, 14, 1, 3)),
    legStats(delayStats(1, 4, 0, 2), undefined),
    legStats(delayStats(0, 0, 0, 0), delayStats(1, 5, 0, 1))
  ];

  // noinspection PointlessArithmeticExpressionJS
  const expectedAggregatedStats: DelayStats = {
    status: "available",
    averageDelay: (10 + 1 + 0 + 1) / 4,
    maxDelay: 14,
    minDelay: 0,
    standardDeviation: Math.sqrt((3 * 3 + 2 * 2 + 0 * 0 + 1 * 1) / 4)
  };

  // When
  const aggregatedStats = historicDataProcessor.getAggregatedDelayStats(allLegStats);

  // Then
  expect(aggregatedStats).toEqual(expectedAggregatedStats);
});

it.each([
  ["all stats available", [
    legStats(undefined, undefined, interchangeReachableStat(75.25)),
    legStats(undefined, undefined, interchangeReachableStat(100.00)),
    legStats(undefined, undefined, interchangeReachableStat(12.25))
  ], (75.25 + 100.00 + 12.25) / 3],
  ["some unavailable stats", [
    legStats(undefined, undefined, undefined),
    legStats(undefined, undefined, interchangeReachableStat(75.25)),
    legStats(undefined, undefined, interchangeReachableStat(62.25)),
    legStats(undefined, undefined, undefined)
  ], (75.25 + 62.25) / 2]
])("aggregate leg interchange reachable stats (%s)", (_descr, legStats, expectedVal) => {
  // Given
  const expectedAggregatedStat: InterchangeReachableStat = {
    status: "available",
    interchangeReachableProbability: expectedVal
  };

  // When
  const aggregatedStats =
    historicDataProcessor.getAggregatedInterchangeReachableStat(legStats);

  // Then
  expect(aggregatedStats).toEqual(expectedAggregatedStat);
});

it.each([
  ["all stats available", [
    legStats(undefined, undefined, undefined, cancellationStat(25.20)),
    legStats(undefined, undefined, undefined, cancellationStat(62.73)),
    legStats(undefined, undefined, undefined, cancellationStat(2.25))
  ], (25.20 + 62.73 + 2.25) / 3],
  ["some unavailable stats", [
    legStats(undefined, undefined, undefined, undefined),
    legStats(undefined, undefined, undefined, cancellationStat(5.25)),
    legStats(undefined, undefined, undefined, cancellationStat(17.50)),
    legStats(undefined, undefined, undefined)
  ], (5.25 + 17.50) / 2]
])("aggregate leg cancellation stats (%s)", (_descr, legStats, expectedVal) => {
  // Given
  const expectedAggregatedStat: CancellationStat = {
    status: "available",
    cancellationProbability: expectedVal
  };

  // When
  const aggregatedStats =
    historicDataProcessor.getAggregatedCancellationStat(legStats);

  // Then
  expect(aggregatedStats).toEqual(expectedAggregatedStat);
});

it("aggregate unavailable stats only to single unavailable stat", () => {
  // Given
  const allLegStats: LegStats[] = [
    legStats(),
    legStats()
  ];

  // When
  const aggregatedDelayStats = historicDataProcessor.getAggregatedDelayStats(allLegStats);
  const aggregatedInterchangeReachableStats = historicDataProcessor.getAggregatedInterchangeReachableStat(allLegStats);
  const aggregatedCancellationStats = historicDataProcessor.getAggregatedCancellationStat(allLegStats);

  // Then
  expect(aggregatedDelayStats).toEqual(unavailableStats());
  expect(aggregatedInterchangeReachableStats).toEqual(unavailableStats());
  expect(aggregatedCancellationStats).toEqual(unavailableStats());
});

function legStats(
  originStats?: DelayStats,
  destinationStats?: DelayStats,
  interchangeReachableStat?: InterchangeReachableStat,
  cancellationStat?: CancellationStat
): LegStats {

  return {
    originDelayStats: originStats ?? unavailableStats(),
    destinationDelayStats: destinationStats ?? unavailableStats(),
    interchangeReachableStat: interchangeReachableStat ?? unavailableStats(),
    cancellationStat: cancellationStat ?? unavailableStats()
  } as LegStats;
}

function delayStats(
  avg: number,
  max: number,
  min: number,
  stddev: number
): DelayStats {

  return {
    status: "available",
    averageDelay: avg,
    maxDelay: max,
    minDelay: min,
    standardDeviation: stddev
  } as DelayStats;
}

function interchangeReachableStat(
  interchangeReachableProb: number
): InterchangeReachableStat {

  return {
    status: "available",
    interchangeReachableProbability: interchangeReachableProb
  } as InterchangeReachableStat;
}

function cancellationStat(
  cancellationStatProb: number
): CancellationStat {

  return {
    status: "available",
    cancellationProbability: cancellationStatProb
  } as CancellationStat;
}

function unavailableStats(): UnavailableStats {

  return {
    status: "unavailable",
    reason: UnavailableReason.noData
  } as UnavailableStats;
}
