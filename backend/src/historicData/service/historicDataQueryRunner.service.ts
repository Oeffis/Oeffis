import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isDate } from "date-fns";
import { Repository } from "typeorm";
import { UnavailableReason, UnavailableStats } from "../dto/maybeStats.dto";
import { DelayEntry } from "../entity/delayEntry.entity";

export interface QueryOptions {
  since?: Date;
}

const QUERY_OPTIONS_SINCE_DEFAULT = "epoch";

export interface QueryResult {}

/*
 * Error-state results.
 */

export const NO_DATA_RESULT: UnavailableStats = {
  status: "unavailable",
  reason: UnavailableReason.noData
};

const INTERNAL_ERROR_RESULT: UnavailableStats = {
  status: "unavailable",
  reason: UnavailableReason.internalError
};

/*
 * Definition of SQL queries.
 */

export const DELAY_AT_STATION_QUERY = `
    WITH historic_with_delay AS (SELECT *, EXTRACT(EPOCH FROM (estimated - planned)::INTERVAL) / 60 AS delay
                                 FROM historic_data
                                 WHERE estimated IS NOT NULL
                                   AND trip_id = $1
                                   AND stop_id IN (SELECT DISTINCT stop_id
                                                   FROM stops
                                                   WHERE "NVBW_HST_DHID" = $2)
                                   AND planned > $3),

         latest_of_day_tripcode AS (SELECT DISTINCT ON (planned:: date, trip_code) *
                                    FROM historic_with_delay
                                    ORDER BY planned:: date, trip_code DESC)

    SELECT MAX(delay), MIN(delay), AVG(delay), STDDEV(delay)
    FROM latest_of_day_tripcode;
`;

export const INTERCHANGE_REACHABLE_QUERY = `

`; // TODO

export const CANCELLATION_QUERY = `

`; // TODO

/**
 * Class to run SQL queries on historic data.
 */
@Injectable()
export class HistoricDataQueryRunner {

  constructor(
    @InjectRepository(DelayEntry)
    private readonly historicDataRepository: Repository<DelayEntry>
  ) { }

  /**
   * Runs SQL query with given options. Results gets parsed with supplied parse function and returned afterward.
   * If there are no results or an error occurs, UnavailableStats are returned with reason for unavailability.
   *
   * @param query query to run
   * @param options options/parameters for query
   * @param parseFunc function to parse query result
   */
  public async runQuery<TQueryResult extends QueryResult, TParsedResult>(
    query: string,
    options: QueryOptions,
    parseFunc: (result: TQueryResult[]) => TParsedResult
  ): Promise<TParsedResult | UnavailableStats> {
    // If there is no value for 'since' option, use default "epoch".
    const optionsWithParsedSince = {
      ...options,
      since: options.since ?? QUERY_OPTIONS_SINCE_DEFAULT
    } as QueryOptions;
    const serializedOptions = this.flattenOptions(optionsWithParsedSince);

    let queryResult: TParsedResult | UnavailableStats;
    try {
      const result = await this.historicDataRepository.query(query, serializedOptions);

      queryResult = !this.isResultEmpty(result)
        ? parseFunc(result)
        : NO_DATA_RESULT;

    } catch (error) {
      console.error(error);
      queryResult = INTERNAL_ERROR_RESULT;

    }

    return queryResult;
  }

  private flattenOptions(options: QueryOptions): unknown[] {
    return Object.values(options)
      .flatMap((value: unknown) => {
        if (typeof value === "object" && value !== null
          && !isDate(value) // Dates should be "passed up", too
        ) {
          return this.flattenOptions(value);
        } else {
          return value;
        }
      });
  }

  private isResultEmpty(queryResult: QueryResult[]): boolean {
    return queryResult.length === 0
      || Object.values(queryResult[0])
        .every(column => column === null);
  }
}
