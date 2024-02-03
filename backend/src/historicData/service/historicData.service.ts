import { Inject, Injectable } from "@nestjs/common";
import { CancellationStat } from "../dto/cancellationStat.dto";
import { DelayStats } from "../dto/delayStats.dto";
import { InterchangeReachableStat } from "../dto/interchangeReachableStat.dto";
import { UnavailableStats } from "../dto/maybeStats.dto";
import {
  CANCELLATION_QUERY,
  DELAY_AT_STATION_QUERY,
  HistoricDataQueryRunner,
  INTERCHANGE_REACHABLE_QUERY,
  QueryOptions,
  QueryResult
} from "./historicDataQueryRunner.service";

/*
 * Specification of options for queries.
 */

export interface DelayAtStationOptions extends QueryOptions {
  tripId: string;
  stopId: string;
}

export interface DelayAtStationAndTimeSubOptions {
  tripId: string;
  stopId: string;
  plannedTime: Date;
}

interface InterchangeReachableOptions extends QueryOptions {
  delayAtCurrentTripDestinationOptions: DelayAtStationAndTimeSubOptions;
  delayAtNextTripOriginOptions: DelayAtStationAndTimeSubOptions;
  interchangeFootpathTime: number;
}

interface CancellationOptions extends QueryOptions {
  tripId: string;
  originStopId: string;
  destinationStopId: string;
}

/*
 * Specification of query results.
 */

interface DelayAtStationQueryResult extends QueryResult {
  max: string;
  min: string;
  avg: string;
  stddev: string;
}

function parseDelayAtStationQueryResult(result: DelayAtStationQueryResult[]): DelayStats {

  return {
    status: "available",
    maxDelay: parseFloat(result[0].max),
    minDelay: parseFloat(result[0].min),
    averageDelay: parseFloat(result[0].avg),
    standardDeviation: parseFloat(result[0].stddev)
  } as DelayStats;
}

interface InterchangeReachableQueryResult extends QueryResult {
// TODO
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseInterchangeReachableQueryResult(result: InterchangeReachableQueryResult[]): InterchangeReachableStat {

  return {
    status: "available",
    interchangeReachableProbability: 0.0 // TODO
  } as InterchangeReachableStat;
}

interface CancellationQueryResult extends QueryResult {
// TODO
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseCancellationQueryResult(result: CancellationQueryResult[]): CancellationStat {

  return {
    status: "available",
    cancellationProbability: 100.0 // TODO
  } as CancellationStat;
}

@Injectable()
export class HistoricDataService {
  constructor(
    @Inject(HistoricDataQueryRunner)
    private readonly historicDataQueryRunner: HistoricDataQueryRunner
  ) { }

  /**
   * Return delay stats for specified stats options (if relevant data is available).
   *
   * @param options options for stats
   */
  public async getDelayStatsAtStation(options: DelayAtStationOptions): Promise<DelayStats | UnavailableStats> {

    return await this.historicDataQueryRunner.runQuery(
      DELAY_AT_STATION_QUERY,
      options,
      parseDelayAtStationQueryResult);
  }

  /**
   * Retrieves the probability of interchanges reached for given relation of current and next trip and specified
   * stop(s) where the interchange takes place based on available historic data. If there are no relevant historic
   * data, undefined gets returned.
   *
   * @param options options for stats
   */
  public async getInterchangeReachableStat(options: InterchangeReachableOptions): Promise<InterchangeReachableStat | UnavailableStats> {

    return await this.historicDataQueryRunner.runQuery(
      INTERCHANGE_REACHABLE_QUERY,
      options,
      parseInterchangeReachableQueryResult
    );
  }

  public async getCancellationStat(options: CancellationOptions): Promise<CancellationStat | UnavailableStats> {

    return await this.historicDataQueryRunner.runQuery(
      CANCELLATION_QUERY,
      options,
      parseCancellationQueryResult
    );
  }
}
