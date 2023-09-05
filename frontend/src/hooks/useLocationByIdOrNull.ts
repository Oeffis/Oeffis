import { useEffect, useState } from "react";
import { Location } from "../api";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

const locationCache = new Map<string, Location>();

export function useLocationByIdOrNull(locationId: string): Location | null {
  const locationFinderApi = useLocationFinderApi();
  const [location, setLocation] = useState<Location | null>(null);
  const abortController = new AbortController();

  useEffect(() => {
    checkCache() || fetchLocation();

    function checkCache(): boolean {
      const cachedLocation = locationCache.get(locationId);
      if (cachedLocation) {
        setLocation(cachedLocation);
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
      isAborted()
        || checkNoLocationFound(matchingLocations)
        || checkMultipleLocationsFound(matchingLocations)
        || singleLocationFound(matchingLocations);
    }

    function isAborted(): boolean {
      return abortController.signal.aborted;
    }

    function checkNoLocationFound(matchingLocations: Location[]): boolean {
      console.error(`No location found with id ${locationId}`);
      return matchingLocations.length === 0;
    }

    function checkMultipleLocationsFound(matchingLocations: Location[]): boolean {
      console.log(`Multiple locations found with id ${locationId}`);
      return matchingLocations.length > 1;
    }

    function singleLocationFound(matchingLocations: Location[]): true {
      console.log(`Single location found with id ${locationId}`);
      locationCache.set(locationId, matchingLocations[0]);
      setLocation(matchingLocations[0]);
      return true;
    }

    function processLocationFailure(error: Error): void {
      console.error(`Failed to find location with id ${locationId}`, error);
    }

    return () => abortController.abort();
  }, [locationCache, locationId]);

  return location;
}

export function useLocationByNullableIdOrNull(locationId: string | null): Location | null {
  return locationId ? useLocationByIdOrNull(locationId) : null;
}
