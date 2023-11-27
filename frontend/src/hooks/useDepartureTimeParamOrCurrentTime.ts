import { formatISO, isValid, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useStateParams } from "./useStateParams";

/**
 * Uses departure time set as URL param and checks if a valid date is given. If URL param is not present or an invalid
 * date, current time gets used. Result is a formatted ISO date string.
 */
export function useDepartureTimeParamOrCurrentTime(): [string, (newDepartureTime: string) => void, () => void] {

  const [departureTimeParam, setDepartureTimeParam] = useStateParams<string | null>(null, "departureTime", String, String);
  const [departureTime, setDepartureTime] = useState<string>(getCurrentTimeISO());

  /**
   * When loading page, URL param departure times is checked to be present and a valid (ISO formatted) date string.
   * If present+valid date, departureTime gets instantiated with this date string as well. If date is invalid, current
   * time gets used to initialise both departureTime and URL param (overwrite invalid value). In the specific case of
   * URL param not being present at all, URL param stays uninitialised.
   */
  useEffect(() => {

    if (departureTimeParam !== null
      && isValid(parseISO(departureTimeParam))) {
      setDepartureTime(departureTimeParam);

    } else if (departureTimeParam !== null) {
      resetDepartureTimeToCurrentTime();

    } else {
      setDepartureTime(getCurrentTimeISO());

    }

  }, []);

  /**
   * Returns current time formatted as ISO string.
   */
  function getCurrentTimeISO(): string {
    return formatISO(
      new Date(Date.now()));
  }

  /**
   * Sets both departureTime and URL param to new departure time.
   */
  function setDepartureTimeAndParam(newDepartureTime: string): void {
    setDepartureTimeParam(newDepartureTime);
    setDepartureTime(newDepartureTime);

  }

  /**
   * Reset both departureTime and URL param to current time.
   */
  function resetDepartureTimeToCurrentTime(): void {
    setDepartureTimeAndParam(
      getCurrentTimeISO());
  }

  return [departureTime, setDepartureTimeAndParam, resetDepartureTimeToCurrentTime];
}
