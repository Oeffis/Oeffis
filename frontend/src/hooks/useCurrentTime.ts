import { useEffect, useState } from "react";

/**
 * Uses current time.
 */
export function useCurrentTime(): Date {
  /** Rate of updating current time in milliseconds. */
  const CURRENT_TIME_UPDATE_RATE_MS = 1000;

  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  /**
   * Updates current time.
   */
  useEffect(() => {
    const timer =
      setInterval(() => {
        setCurrentTime(new Date());
      }, CURRENT_TIME_UPDATE_RATE_MS);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return currentTime;
}
