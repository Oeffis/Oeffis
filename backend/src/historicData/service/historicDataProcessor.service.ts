import { Injectable } from "@nestjs/common";
import { DelayStats } from "../dto/delayStats.dto";
import { LegStats } from "../dto/legStats.dto";
import { MaybeStats, UnavailableReason, UnavailableStats } from "../dto/maybeStats.dto";

@Injectable()
export class HistoricDataProcessorService {

  /**
   * Aggregates given leg delay stats to one single delay stats.
   *
   * @param legStats leg Stats to aggregate
   */
  public getAggregatedLegDelayStats(legStats: Array<LegStats>): MaybeStats {
    const allDelayStats: DelayStats[] = legStats
      .flatMap(legStats => [legStats.originDelayStats, legStats.destinationDelayStats])
      .filter(legStats => legStats.status === "available") as DelayStats[];

    if (allDelayStats.length === 0) {
      return new UnavailableStats(UnavailableReason.noData);
    }

    return {
      status: "available",
      averageDelay: (allDelayStats
        .map(delayStats => delayStats.averageDelay)
        .reduce((prev, curr) => prev + curr)) / allDelayStats.length,
      maxDelay: Math.max(...allDelayStats
        .map(delayStats => delayStats.maxDelay)),
      minDelay: Math.min(...allDelayStats
        .map(delayStats => delayStats.minDelay)),
      standardDeviation: Math.sqrt(
        (allDelayStats
          .map(delayStats => delayStats.standardDeviation * delayStats.standardDeviation)
          .reduce((prev, curr) => prev + curr)) / allDelayStats.length
      )
    } as DelayStats;
  }

}
