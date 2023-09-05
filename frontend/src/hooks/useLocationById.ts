import { useEffect, useState } from "react";
import { Location } from "../api";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

const locationCache = new Map<string, Location>();

export type LocationByIdResult = LocationByIdSuccess | LocationByIdError | LocationByIdPending;
export interface LocationByIdSuccess {
  type: "success";
  location: Location;
}
export interface LocationByIdError {
  type: "error";
  error: Error;
}
export interface LocationByIdPending {
  type: "pending";
}

export function useLocationById(locationId: string): LocationByIdResult {
  const locationFinderApi = useLocationFinderApi();
  const [location, setLocation] = useState<LocationByIdResult>({ type: "pending" });
  const abortController = new AbortController();

  useEffect(() => {
    checkCache() || fetchLocation();

    function checkCache(): boolean {
      const cachedLocation = locationCache.get(locationId);
      if (cachedLocation) {
        setLocation({ type: "success", location: cachedLocation });
        return true;
      }
      return false;
    }

    function fetchLocation(): void {
      locationFinderApi
        .locationFinderControllerFindLocationsByName(
          { name: locationId },
          { signal: abortController.signal }
        )
        .then(processLocationResult, processLocationFailure);
    }

    function processLocationResult(matchingLocations: Location[]): void {
      isAborted() ||
        setLocation(
          checkNoLocationFound(matchingLocations) ||
          checkMultipleLocationsFound(matchingLocations) ||
          checkSingleLocationFound(matchingLocations)
        );
    }

    function isAborted(): boolean {
      return abortController.signal.aborted;
    }

    function checkNoLocationFound(matchingLocations: Location[]): LocationByIdError | null {
      if (matchingLocations.length !== 0) return null;
      return { type: "error", error: new Error(`No location found with id ${locationId}`) };
    }

    function checkMultipleLocationsFound(matchingLocations: Location[]): LocationByIdError | null {
      if (matchingLocations.length <= 1) return null;
      return { type: "error", error: new Error(`Multiple locations found with id ${locationId}`) };
    }

    function checkSingleLocationFound(matchingLocations: Location[]): LocationByIdSuccess {
      if (matchingLocations.length !== 1) throw new Error("Expected exactly one location for id ${locationId}");
      locationCache.set(locationId, matchingLocations[0]);
      return { type: "success", location: matchingLocations[0] };
    }

    function processLocationFailure(error: Error): void {
      setLocation({ type: "error", error });
    }

    return () => abortController.abort();
  }, [locationCache, locationId]);

  return location;
}


export type NullableLocationByIdResult = LocationByIdResult | LocationNullResult;
interface LocationNullResult {
  type: "success";
  location: null;
}

export function useNullableLocationById(locationId: string | null): NullableLocationByIdResult {
  return locationId ? useLocationById(locationId) : { type: "success", location: null };
}
