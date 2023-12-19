import { Injectable } from "@nestjs/common";
import { CancellationStat } from "../dto/cancellationStat.dto";
import { DelayStats } from "../dto/delayStats.dto";
import { InterchangeReachableStat } from "../dto/interchangeReachableStat.dto";
import { LegStats } from "../dto/legStats.dto";
import { UnavailableReason, UnavailableStats } from "../dto/maybeStats.dto";
import { NO_DATA_RESULT } from "./historicDataQueryRunner.service";

@Injectable()
export class HistoricDataProcessorService {

  /**
   * Aggregates given leg delay stats to one single delay stats.
   *
   * @param legStats leg stats to aggregate
   */
  public getAggregatedDelayStats(legStats: Array<LegStats>): DelayStats | UnavailableStats {
    const allDelayStats: DelayStats[] = legStats
      .flatMap(legStats => [legStats.originDelayStats, legStats.destinationDelayStats])
      .filter(legStats => legStats.status === "available") as DelayStats[];

    if (allDelayStats.length === 0) {
      return new UnavailableStats(UnavailableReason.noData);
    }

    const averageDelay: number = (allDelayStats
      .map(delayStats => delayStats.averageDelay)
      .reduce((prev, curr) => prev + curr)) / allDelayStats.length;

    const maxDelay: number = Math.max(...allDelayStats
      .map(delayStats => delayStats.maxDelay));
    const minDelay: number = Math.min(...allDelayStats
      .map(delayStats => delayStats.minDelay));

    const standardDeviation: number = Math.sqrt(
      (allDelayStats
        .map(delayStats => delayStats.standardDeviation * delayStats.standardDeviation)
        .reduce((prev, curr) => prev + curr)) / allDelayStats.length
    );

    return {
      status: "available",
      averageDelay: averageDelay,
      maxDelay: maxDelay,
      minDelay: minDelay,
      standardDeviation: standardDeviation
    } as DelayStats;
  }

  /**
   * Aggregates given leg interchange reachable stats to one single interchange reachable stat.
   *
   * @param legStats leg stats to process
   */
  public getAggregatedInterchangeReachableStat(legStats: LegStats[]): InterchangeReachableStat | UnavailableStats {
    const allInterchangeReachableStats: InterchangeReachableStat[] = legStats
      .map(legStat => legStat.interchangeReachableStat)
      .filter(interchangeReachableStat => interchangeReachableStat.status === "available") as InterchangeReachableStat[];

    if (allInterchangeReachableStats.length === 0) {
      return NO_DATA_RESULT;
    }

    const avgInterchangeReachable: number = (allInterchangeReachableStats
      .map(interchangeReachableStat => interchangeReachableStat.interchangeReachableProbability)
      .reduce((prev, curr) => prev + curr)) / allInterchangeReachableStats.length;

    return {
      status: "available",
      interchangeReachableProbability: avgInterchangeReachable
    } as InterchangeReachableStat;
  }

  /**
   * Aggregates given leg cancellation stats to one single cancellation stat.
   *
   * @param legStats leg stats to process
   */
  public getAggregatedCancellationStat(legStats: LegStats[]): CancellationStat | UnavailableStats {
    const allCancellationStats: CancellationStat[] = legStats
      .map(legStat => legStat.cancellationStat)
      .filter(cancellationStat => cancellationStat.status === "available") as CancellationStat[];

    if (allCancellationStats.length === 0) {
      return NO_DATA_RESULT;
    }

    const avgCancellationProbability: number = (allCancellationStats
      .map(cancellationStat => cancellationStat.cancellationProbability)
      .reduce((prev, curr) => prev + curr)) / allCancellationStats.length;

    return {
      status: "available",
      cancellationProbability: avgCancellationProbability
    } as CancellationStat;
  }
}
