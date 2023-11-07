import { isAfter, isValid, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { DEPARTURE_TIME_NOW_PARAM } from "../components/RoutePlanner/RoutePlanner";
import { useCurrentTime } from "./useCurrentTime";

/**
 * Uses custom departure time url param or, if no param is given, current time.
 *
 * @param customDepartureTimeParam custom departure time url param (or null)
 */
export function useCustomDepartureTimeUrlParamOrCurrentTime(customDepartureTimeParam: string): Date {

  /** Current time to use as default/fallback value. */
  const currentTime = useCurrentTime();

  const [departureTime, setDepartureTime] = useState<Date>(currentTime);

  /**
   * Updates state of departureTime everytime customDepartureTime (set as url param) changes.
   * This is also used when the side is loaded with a preset departure time url param to initialize departure time with
   * that value.
   */
  useEffect(() => {

    if (customDepartureTimeParam === DEPARTURE_TIME_NOW_PARAM) {
      setDepartureTime(currentTime);

    } else {
      const parsedDate: Date = parseISO(customDepartureTimeParam);

      // If given date is invalid or in the past, default current time is used.
      if (isValid(parsedDate) && isAfter(parsedDate, currentTime)) {
        setDepartureTime(parsedDate);

      } else {
        setDepartureTime(currentTime);
      }

    }

  }, [customDepartureTimeParam]);

  return departureTime;
}
