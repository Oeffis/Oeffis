import { Geolocation, Position } from "@capacitor/geolocation";
import { createContext, useContext, useEffect, useState } from "react";

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
}

export const CurrentLocationContext = createContext<CurrentLocation | null>(null);

export function CurrentLocationProvider(props: { children: React.ReactNode }): JSX.Element {
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({
    state: "pending",
    error: null,
    location: null
  });

  useEffect(() => {
    console.log("use effect context provider location");
    let jobsWatchId: string | null = null;

    void Geolocation.watchPosition({}, (position, error) => {
      if (error) {
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
          location: position
        });
      }

    }).then((watchId) => {
      console.debug("Started location watch with id: ", watchId);
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
        console.debug("Stopping location watch with id: ", jobsWatchId);
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
