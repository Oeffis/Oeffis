import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UnavailableReason, UnavailableStats } from "../../dto/maybeStats.dto";
import { DelayEntry } from "../../entity/delayEntry.entity";

/*
 * Base interfaces for input (options) and output (result).
 */
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

/**
 * Class to run SQL queries on historic data.
 */
@Injectable()
export class HistoricDataQueryRunnerService {

  constructor(
    @InjectRepository(DelayEntry)
    private readonly historicDataRepository: Repository<DelayEntry>
  ) { }

  /**
   * Runs SQL query with given serialized options. Serialization is done by executing given serialize function.
   * Results are parsed with parse function and returned afterward. If there are no results or an error occurs,
   * UnavailableStats are returned with reason for unavailability.
   *
   * @param query query to run
   * @param options options for query
   * @param serializeFunc function to serialize query options
   * @param parseFunc function to parse query results
   */
  public async runQuery<TQueryOptions extends QueryOptions, TQueryResult extends QueryResult, TParsedResult>(
    query: string,
    options: QueryOptions,
    serializeFunc: (options: TQueryOptions) => unknown[],
    parseFunc: (results: TQueryResult[]) => TParsedResult
  ): Promise<TParsedResult | UnavailableStats> {

    // If there is no value for 'since' option, use default "epoch".
    const optionsWithParsedSince = {
      ...options,
      since: options.since ?? QUERY_OPTIONS_SINCE_DEFAULT
    } as TQueryOptions;
    const serializedOptions = serializeFunc(optionsWithParsedSince);

    let result: TParsedResult | UnavailableStats;
    try {
      const queryResults = await this.historicDataRepository.query(query, serializedOptions);
      result = !this.isResultEmpty(queryResults)
        ? parseFunc(queryResults)
        : NO_DATA_RESULT;

    } catch (error) {
      console.error(error);
      result = INTERNAL_ERROR_RESULT;

    }

    return result;
  }

  private isResultEmpty(queryResult: QueryResult[]): boolean {
    return queryResult.length === 0
      || Object.values(queryResult[0])
        .every(column => column === null);
  }
}
