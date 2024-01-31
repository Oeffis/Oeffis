import { Inject, Injectable } from "@nestjs/common";
import { CancellationStat } from "../dto/cancellationStat.dto";
import { DelayStats } from "../dto/delayStats.dto";
import { InterchangeReachableStat } from "../dto/interchangeReachableStat.dto";
import { UnavailableStats } from "../dto/maybeStats.dto";
import {
  DELAY_AT_STOP_QUERY,
  DelayAtStopOptions,
  parseDelayAtStopQueryResult,
  serializeDelayAtStopQueryOptions
} from "./query/delayAtStop.query";
import { HistoricDataQueryRunnerService, NO_DATA_RESULT } from "./query/historicDataQueryRunner.service";
import { InterchangeReachableOptions } from "./query/interchangeReachable.query";
import {
  parseTripCancellationQueryResult,
  serializeTripCancellationQueryOptions,
  TRIP_CANCELLATION_QUERY,
  TripCancellationOptions
} from "./query/tripCancellation.query";

@Injectable()
export class HistoricDataService {
  constructor(
    @Inject(HistoricDataQueryRunnerService)
    private readonly historicDataQueryRunner: HistoricDataQueryRunnerService
  ) { }

  /**
   * Return delay stats for specified stats options (if relevant data is available).
   *
   * @param options options for stats
   */
  public async getDelayStatsAtStation(
    options: DelayAtStopOptions
  ): Promise<DelayStats | UnavailableStats> {

    return await this.historicDataQueryRunner.runQuery(
      DELAY_AT_STOP_QUERY, options,
      serializeDelayAtStopQueryOptions,
      parseDelayAtStopQueryResult);
  }

  /**
   * Retrieves the probability of interchanges reached for given relation of current and next trip and specified
   * stop(s) where the interchange takes place based on available historic data. If there are no relevant historic
   * data, undefined gets returned.
   *
   * @param options options for stats
   */
  public async getInterchangeReachableStat(
    options: InterchangeReachableOptions
  ): Promise<InterchangeReachableStat | UnavailableStats> {

    // return await this.historicDataQueryRunner.runQuery(
    //   INTERCHANGE_REACHABLE_QUERY, options,
    //   serializeInterchangeReachableQueryOptions,
    //   parseInterchangeReachableQueryResult);
    return NO_DATA_RESULT;
  }

  public async getCancellationStat(
    options: TripCancellationOptions
  ): Promise<CancellationStat | UnavailableStats> {

    return await this.historicDataQueryRunner.runQuery(
      TRIP_CANCELLATION_QUERY,
      options,
      serializeTripCancellationQueryOptions,
      parseTripCancellationQueryResult
    );
  }
}
