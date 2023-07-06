/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { multipleStationData } from '../models/multipleStationData';
import type { timetable } from '../models/timetable';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TimetablesService {

    /**
     * Returns all known changes for a station
     * Returns a Timetable object (see Timetable) that contains all known changes for the station given by evaNo.
     *
     * The data includes all known changes from now on until ndefinitely into the future. Once changes become obsolete (because their trip departs from the station) they are removed from this resource.
     *
     * Changes may include messages. On event level, they usually contain one or more of the 'changed' attributes ct, cp, cs or cpth. Changes may also include 'planned' attributes if there is no associated planned data for the change (e.g. an unplanned stop or trip).
     *
     * Full changes are updated every 30s and should be cached for that period by web caches.
     *
     * @param evaNo Station EVA-number.
     * @returns timetable successful operation
     * @throws ApiError
     */
    public static getFchg(
        evaNo: string = '8000105',
    ): CancelablePromise<timetable> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fchg/{evaNo}',
            path: {
                'evaNo': evaNo,
            },
            errors: {
                404: `resource not found`,
            },
        });
    }

    /**
     * Returns planned data for the specified station within an hourly time slice
     * Returns a Timetable object (see Timetable) that contains planned data for the specified station (evaNo) within the hourly time slice given by date (format YYMMDD) and hour (format HH). The data includes stops for all trips that arrive or depart within that slice. There is a small overlap between slices since some trips arrive in one slice and depart in another.
     *
     * Planned data does never contain messages. On event level, planned data contains the 'plannned' attributes pt, pp, ps and ppth while the 'changed' attributes ct, cp, cs and cpth are absent.
     *
     * Planned data is generated many hours in advance and is static, i.e. it does never change. It should be cached by web caches.public interface allows access to information about a station.
     *
     * @param hour Hour in format HH.
     * @param evaNo Station EVA-number.
     * @param date Date in format YYMMDD.
     * @returns timetable successful operation
     * @throws ApiError
     */
    public static getPlan(
        hour: string,
        evaNo: string = '8000105',
        date: string = '220930',
    ): CancelablePromise<timetable> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plan/{evaNo}/{date}/{hour}',
            path: {
                'evaNo': evaNo,
                'date': date,
                'hour': hour,
            },
            errors: {
                404: `resource not found`,
            },
        });
    }

    /**
     * Returns all recent changes for a station
     * Returns a Timetable object (see Timetable) that contains all recent changes for the station given by evaNo. Recent changes are always a subset of the full changes. They may equal full changes but are typically much smaller. Data includes only those changes that became known within the last 2 minutes.
     *
     * A client that updates its state in intervals of less than 2 minutes should load full changes initially and then proceed to periodically load only the recent changes in order to save bandwidth.
     *
     * Recent changes are updated every 30s as well and should be cached for that period by web caches.
     *
     * @param evaNo Station EVA-number.
     * @returns timetable successful operation
     * @throws ApiError
     */
    public static getRchg(
        evaNo: string = '8000105',
    ): CancelablePromise<timetable> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rchg/{evaNo}',
            path: {
                'evaNo': evaNo,
            },
            errors: {
                404: `resource not found`,
            },
        });
    }

    /**
     * Returns information about stations matching the given pattern
     * This public interface allows access to information about a station.
     * @param pattern can be a station name (prefix), eva number, ds100/rl100 code, wildcard (*); doesn't seem to work with umlauten in station name (prefix)
     * @returns multipleStationData successful operation
     * @throws ApiError
     */
    public static getStation(
        pattern: string = 'BLS',
    ): CancelablePromise<multipleStationData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/station/{pattern}',
            path: {
                'pattern': pattern,
            },
            errors: {
                404: `resource not found`,
            },
        });
    }

}
