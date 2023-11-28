import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DelayStats, LegStats, UnavailableDelayStats, UnavailableReason } from "historicData/dto/legStats.dto";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { Repository } from "typeorm";

export interface PartialRouteStatOptions {
  tripId: string;
  originId: string;
  destinationId: string;
  since?: Date;
}
interface StatQueryResult {
  max: string;
  min: string;
  avg: string;
  stddev: string;
}

const PARTIAL_ROUTE_STATS_QUERY = `
    WITH historic_with_delay AS (SELECT *, EXTRACT(EPOCH FROM (estimated - planned)::INTERVAL) / 60 AS delay
                                 FROM historic_data
                                 WHERE estimated IS NOT NULL
                                   AND trip_id = $1
                                   AND parent_stop_id = $2
                                   AND planned > $3),

         latest_of_day_tripcode AS (SELECT DISTINCT
    ON (planned:: date, trip_code) *
    FROM historic_with_delay
    ORDER BY planned:: date, trip_code DESC
        )

    SELECT MAX(delay), MIN(delay), AVG(delay), STDDEV(delay)
    FROM latest_of_day_tripcode;
`;

const NO_DATA_RESULT: UnavailableDelayStats = {
  status: "unavailable",
  reason: UnavailableReason.noData
};

const INTERNAL_ERROR_RESULT: UnavailableDelayStats = {
  status: "unavailable",
  reason: UnavailableReason.internalError
};

@Injectable()
export class DelayStatsService {
  constructor(
    @InjectRepository(DelayEntry)
    private readonly delayEntryRepository: Repository<DelayEntry>
  ) { }

  public async getPartialRouteStats(partialRouteStatOptions: PartialRouteStatOptions): Promise<LegStats> {
    const originDelayStats = await this.tryGetDelayAtStationStats(
      partialRouteStatOptions.tripId, partialRouteStatOptions.originId, partialRouteStatOptions.since);
    const destinationDelayStats = await this.tryGetDelayAtStationStats(
      partialRouteStatOptions.tripId, partialRouteStatOptions.destinationId, partialRouteStatOptions.since);

    return {
      originDelayStats: originDelayStats,
      destinationDelayStats: destinationDelayStats
    } as LegStats;
  }

  private async tryGetDelayAtStationStats(tripId: string, stationId: string, since?: Date | undefined): Promise<DelayStats | UnavailableDelayStats> {
    try {
      const queryResult = await this.queryForDelayAtStationStats(tripId, stationId, since);

      if (this.isResultEmpty(queryResult)) {
        return NO_DATA_RESULT;
      }

      return this.parseDelayStatsFromQueryResult(queryResult);

    } catch (error) {
      console.error(error);
      return INTERNAL_ERROR_RESULT;

    }
  }

  private queryForDelayAtStationStats(tripId: string, stationId: string, since?: Date | undefined): Promise<StatQueryResult[]> {
    const parsedSince = since ?? "epoch";
    return this.delayEntryRepository.query(
      PARTIAL_ROUTE_STATS_QUERY,
      [tripId, stationId, parsedSince]
    ) as Promise<StatQueryResult[]>;
  }

  private isResultEmpty(queryResult: StatQueryResult[]): boolean {
    return queryResult.length === 0 || Object.values(queryResult[0]).every(column => column === null);
  }

  private parseDelayStatsFromQueryResult(stats: StatQueryResult[]): UnavailableDelayStats | DelayStats | PromiseLike<UnavailableDelayStats | DelayStats> {
    return {
      status: "available",
      maxDelay: parseFloat(stats[0].max),
      minDelay: parseFloat(stats[0].min),
      averageDelay: parseFloat(stats[0].avg),
      standardDeviation: parseFloat(stats[0].stddev)
    };
  }
}
