import { DelayStats } from "../dto/delayStats.dto";
import { LegStats } from "../dto/legStats.dto";
import { MaybeStats, UnavailableReason, UnavailableStats } from "../dto/maybeStats.dto";
import { HistoricDataProcessorService } from "./historicDataProcessor.service";

let historicDataProcessor: HistoricDataProcessorService;

beforeEach(() => {
  historicDataProcessor = new HistoricDataProcessorService();
});

it("aggregate leg delay stats to single delay stat", () => {
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
  const aggregatedStats = historicDataProcessor.getAggregatedLegDelayStats(allLegStats);

  // Then
  expect(aggregatedStats).toEqual(expectedAggregatedStats);
});

it("aggregate leg delay stats with some missing ones to single delay stat", () => {
  // Given
  const allLegStats: LegStats[] = [
    legStats(unavailableStats(), delayStats(10, 14, 1, 3)),
    legStats(delayStats(1, 4, 0, 2), unavailableStats()),
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
  const aggregatedStats = historicDataProcessor.getAggregatedLegDelayStats(allLegStats);

  // Then
  expect(aggregatedStats).toEqual(expectedAggregatedStats);
});

it("aggregate unavailable stats only to single delay stat", () => {
  // Given
  const allLegStats: LegStats[] = [
    legStats(unavailableStats(), unavailableStats()),
    legStats(unavailableStats(), unavailableStats())
  ];

  // When
  const aggregatedStats = historicDataProcessor.getAggregatedLegDelayStats(allLegStats);

  // Then
  expect(aggregatedStats).toEqual(new UnavailableStats(UnavailableReason.noData));
});

function legStats(originStats: MaybeStats, destinationStats: MaybeStats): LegStats {
  return {
    originDelayStats: originStats,
    destinationDelayStats: destinationStats
  } as LegStats;
}

function delayStats(
  avg: number,
  max: number,
  min: number,
  stddev: number): DelayStats {

  return {
    status: "available",
    averageDelay: avg,
    maxDelay: max,
    minDelay: min,
    standardDeviation: stddev
  } as DelayStats;
}

function unavailableStats(): UnavailableStats {

  return {
    status: "unavailable",
    reason: UnavailableReason.noData
  } as UnavailableStats;
}
