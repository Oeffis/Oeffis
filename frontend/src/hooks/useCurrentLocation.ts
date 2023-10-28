import { Geolocation, Position } from "@capacitor/geolocation";
import { useEffect, useState } from "react";

export function useCurrentLocation(): { currentLocation: Position | null, currentError: Error | null } {
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [currentError, setCurrentError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    let isAborted = false;
    abortController.signal.addEventListener("abort", () => {
      isAborted = true;
    });

    void Geolocation.watchPosition({}, (position, error) => {
      if (error) {
        setCurrentError(error as Error);
        setCurrentLocation(null);
      }
      if (position) {
        setCurrentLocation(position);
        setCurrentError(null);
      }
    }).then((watchId) => {
      console.debug("Started location watch with id: ", watchId);
      if (isAborted) {
        console.debug("Aborting location watch with id: ", watchId);
        void Geolocation.clearWatch({ id: watchId });
      }
    }, (error) => {
      console.error("Failed to start location watch: ", error);
      setCurrentError(error as Error);
    });

    return () => { abortController.abort(); };
  });

  return {
    currentLocation,
    currentError
  };
}
