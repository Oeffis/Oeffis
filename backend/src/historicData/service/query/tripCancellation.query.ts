/*
 * Definition of input.
 */
import { CancellationStat } from "../../dto/cancellationStat.dto";
import { QueryOptions, QueryResult } from "./historicDataQueryRunner.service";

export interface TripCancellationOptions extends QueryOptions {
  tripId: string;
  originStopId: string;
  originPlannedDeparture: Date;
  prevDestinationStopId: string;
  drivingTime: number;
}

export function serializeTripCancellationQueryOptions(
  options: TripCancellationOptions
): unknown[] {

  return [
    options.tripId,
    options.originStopId,
    options.originPlannedDeparture,
    options.prevDestinationStopId,
    options.drivingTime,
    options.since
  ];
}

/*
 * Query.
 */

/**
 * Query cancellation-status of trips from origin to destination. Parameters are:
 * - $1 trip id
 * - $2 origin stop id (NVBW_HST_DHID)
 * - $3 origin planned departure
 * - $4 prev destination stop id (NVBW_HST_DHID)
 * - $5 driving time (origin to destination), in seconds
 * - $6 since (time frame)
 */
export const TRIP_CANCELLATION_QUERY = `
    WITH with_latest_recordings_origin AS
             (SELECT *, MAX(recording_time) OVER (PARTITION BY planned) AS latest_recording_time
              FROM historic_data
              WHERE trip_id = $1
                AND parent_stop_id = $2
                AND planned > $6),

         with_latest_recordings_prev_destination AS
             (SELECT *, MAX(recording_time) OVER (PARTITION BY planned) AS latest_recording_time
              FROM historic_data
              WHERE trip_id = $1
                AND parent_stop_id = $4
                AND planned > $6),

         origin_to_destination_trips AS
             (SELECT origin.planned                AS origin_planned,
                     origin.is_cancelled           AS origin_cancelled,
                     prev_destination.planned      AS prev_destination_planned,
                     prev_destination.is_cancelled AS prev_destination_cancelled
              FROM with_latest_recordings_origin AS origin
                       INNER JOIN with_latest_recordings_prev_destination AS prev_destination
                                  ON origin.trip_code = prev_destination.trip_code
                                      AND EXTRACT(EPOCH FROM (prev_destination.planned - origin.planned)::INTERVAL) = $5
              WHERE origin.recording_time = origin.latest_recording_time
                AND prev_destination.recording_time = prev_destination.latest_recording_time)

    SELECT *, $3::timestamp AS searched_origin_departure
    FROM origin_to_destination_trips;
`;

export interface CancellationQueryResult extends QueryResult {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  origin_planned: Date;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  origin_cancelled: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  prev_destination_planned: Date;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  prev_destination_cancelled: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  searched_origin_departure: Date;
}

export function parseTripCancellationQueryResult(
  results: CancellationQueryResult[]
): CancellationStat {

  // Counts for trip in general.
  const totalTripsCount = results.length;
  const cancelledTripsCount = results
    .filter(result => result.origin_cancelled || result.prev_destination_cancelled)
    .length;

  // Counts for trip at searched day of week (dow) and time.
  // As origin and destination are linked via trip_code in SQL query, it's enough to check originPlanned Date here.
  const dowTimeTrips = results
    .filter(result =>
      result.origin_planned.getDay() === result.searched_origin_departure.getDay()
      && result.origin_planned.toTimeString() === result.searched_origin_departure.toTimeString());
  const totalDowTimeTripsCount = dowTimeTrips.length;
  const cancelledDowTimeTripsCount = dowTimeTrips
    .filter(result => result.origin_cancelled || result.prev_destination_cancelled)
    .length;

  return {
    status: "available",
    cancellationProbability: cancelledTripsCount / totalTripsCount,
    cancellationAtDowTimeProbability: cancelledDowTimeTripsCount / totalDowTimeTripsCount
  } as CancellationStat;
}
