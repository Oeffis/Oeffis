/*
 * Definition of input.
 */
import { DelayStats } from "../../dto/delayStats.dto";
import { QueryOptions, QueryResult } from "./historicDataQueryRunner.service";

export interface DelayAtStopOptions extends QueryOptions {
  tripId: string;
  stopId: string;
}

export function serializeDelayAtStopQueryOptions(
  options: DelayAtStopOptions
): unknown[] {

  return [options.tripId, options.stopId, options.since];
}

export interface DelayAtStopAndTimeOptions extends DelayAtStopOptions {
  plannedTime: Date;
}

export function serializeDelayAtStopAndTimeQueryOptions(
  options: DelayAtStopAndTimeOptions
): unknown[] {

  return [options.tripId, options.stopId, options.plannedTime, options.since];
}

/*
 * Query.
 */

/**
 * Requesting delay stats for a stop. Parameters needed are:
 * - $1 trip id
 * - $2 NVWB_HST_DHID of stop
 * - $3 since (time frame to consider)
 */
export const DELAY_AT_STOP_QUERY = `
    WITH historic_with_delay AS
             (SELECT *, EXTRACT(EPOCH FROM (estimated - planned)::INTERVAL) / 60 AS delay
              FROM historic_data
              WHERE estimated IS NOT NULL
                AND trip_id = $1
                AND stop_id IN
                    (SELECT DISTINCT stop_id
                     FROM stops
                     WHERE "NVBW_HST_DHID" = $2)
                AND planned > $3),

         latest_of_day_tripcode AS
             (SELECT DISTINCT ON (planned:: date, trip_code) *
              FROM historic_with_delay
              ORDER BY planned:: date, trip_code DESC)

    SELECT MAX(delay), MIN(delay), AVG(delay), STDDEV(delay)
    FROM latest_of_day_tripcode;
`;

/*
 * Definition of output.
 */

interface DelayAtStopQueryResult extends QueryResult {
  max: string;
  min: string;
  avg: string;
  stddev: string;
}

export function parseDelayAtStopQueryResult(
  result: DelayAtStopQueryResult[]
): DelayStats {

  return {
    status: "available",
    maxDelay: parseFloat(result[0].max),
    minDelay: parseFloat(result[0].min),
    averageDelay: parseFloat(result[0].avg),
    standardDeviation: parseFloat(result[0].stddev)
  } as DelayStats;
}
