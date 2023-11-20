import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LegStats, UnavailableLegStats, UnavailableReason } from "historicData/dto/legStats.dto";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { Repository } from "typeorm";

export interface LegStatOptions {
  tripId: string;
  since?: Date;
}
interface StatQueryResult {
  max: string;
  min: string;
  avg: string;
  stddev: string;
}

const LEG_STATS_QUERY = `
WITH 
  historic_with_delay AS (
    SELECT *, EXTRACT(EPOCH FROM (estimated - planned)::INTERVAL)/60 AS delay
    FROM historic_data
    WHERE estimated IS NOT NULL
    AND trip_id = $1
    AND planned > $2
  ),
  latest_of_day_tripcode AS (
    SELECT DISTINCT ON (planned::date, trip_code) *
    FROM historic_with_delay
    ORDER BY planned::date, trip_code DESC
  )

SELECT MAX(delay), MIN(delay), AVG(delay), STDDEV(delay) FROM latest_of_day_tripcode;
`;

type StatsRequest = Promise<LegStats | UnavailableLegStats>;

@Injectable({ scope: Scope.REQUEST })
export class DelayStatsService {
  private readonly cache = new Map<string, StatsRequest>();
  constructor(
    @InjectRepository(DelayEntry)
    private readonly delayEntryRepository: Repository<DelayEntry>
  ) { }

  public async getLegStats(legStatOptions: LegStatOptions): StatsRequest {
    const cached = this.cache.get(legStatOptions.tripId);
    if (cached) {
      console.debug("Using cached stats for trip", legStatOptions.tripId);
      return cached;
    }

    const newStatsRequest = this.getLegStatsFromDb(legStatOptions)
      .then(stats => {
        console.debug("Caching stats for trip", legStatOptions.tripId);
        return stats;
      });
    this.cache.set(legStatOptions.tripId, newStatsRequest);
    return newStatsRequest;
  }

  private async getLegStatsFromDb(legStatOptions: LegStatOptions): StatsRequest {
    const since = legStatOptions.since ?? "epoch";
    let stats;
    try {
      stats = await this.delayEntryRepository.query(
        LEG_STATS_QUERY,
        [legStatOptions.tripId, since]
      ) as StatQueryResult[];
    } catch (error) {
      console.error(error);
      return {
        areAvailable: false,
        reason: UnavailableReason.internalError
      };
    }

    if (Object.values(stats[0]).some(column => column === null)) {
      return {
        areAvailable: false,
        reason: UnavailableReason.noData
      };
    }

    return {
      areAvailable: true,
      maxDelay: parseFloat(stats[0].max),
      minDelay: parseFloat(stats[0].min),
      averageDelay: parseFloat(stats[0].avg),
      standardDeviation: parseFloat(stats[0].stddev)
    };
  }
}
