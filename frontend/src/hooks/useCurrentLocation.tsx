import { Geolocation, Position } from "@capacitor/geolocation";
import { createContext, useContext, useEffect, useState } from "react";

const GEOLOCATION_POSITION_ERROR_TIMEOUT_CODE = 3;

export type CurrentLocation = CurrentLocationFailed | CurrentLocationPending | CurrentLocationLocated;

export interface CurrentLocationFailed {
  state: "failed";
  error: Error;
  location: null;
}

export interface CurrentLocationPending {
  state: "pending";
  error: null;
  location: null;
}

export interface CurrentLocationLocated {
  state: "located";
  error: null;
  location: Position;
  isStale: boolean;
}

export const CurrentLocationContext = createContext<CurrentLocation | null>(null);

export function CurrentLocationProvider(props: { children: React.ReactNode }): JSX.Element {
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({
    state: "pending",
    error: null,
    location: null
  });

  useEffect(() => {
    let jobsWatchId: string | null = null;

    void Geolocation.watchPosition({}, (position, error) => {
      if (error) {
        // If the error is a timeout error and we already have a location, we can just mark it as stale.

        if (
          error instanceof GeolocationPositionError
          && error.code === GEOLOCATION_POSITION_ERROR_TIMEOUT_CODE
          && currentLocation.state === "located"
        ) {
          setCurrentLocation({
            state: "located",
            error: null,
            location: currentLocation.location,
            isStale: true
          });
        }

        setCurrentLocation({
          state: "failed",
          error: error as Error,
          location: null
        });
      }

      if (position) {
        setCurrentLocation({
          state: "located",
          error: null,
          location: position,
          isStale: false
        });
      }

    }).then((watchId) => {
      jobsWatchId = watchId;
    }, (error) => {
      console.error("Failed to start location watch: ", error);

      setCurrentLocation({
        state: "failed",
        error: error as Error,
        location: null
      });
    });

    return () => {
      if (jobsWatchId) {
        void Geolocation.clearWatch({ id: jobsWatchId });
      }
    };
  }, []);

  return (
    <CurrentLocationContext.Provider value={currentLocation} >
      {props.children}
    </CurrentLocationContext.Provider>
  );
}

export function useCurrentLocation(): CurrentLocation {
  const currentLocation = useContext(CurrentLocationContext);
  if (!currentLocation) {
    throw new Error("useCurrentLocation must be used within a CurrentLocationProvider");
  }

  return currentLocation;
}
