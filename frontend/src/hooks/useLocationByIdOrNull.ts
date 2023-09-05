import { useEffect, useState } from "react";
import { Location } from "../api";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

const locationCache = new Map<string, Location>();

export function useLocationByIdOrNull(locationId: string | null): Location | null {
  const locationFinderApi = useLocationFinderApi();
  const [location, setLocation] = useState<Location | null>(null);
  const abortController = new AbortController();

  useEffect(() => {
    checkNull(locationId)
      || checkCache(locationId)
      || fetchLocation(locationId);

    function checkNull(locationId: string | null): locationId is null {
      if (locationId !== null) return false;
      setLocation(null);
      return true;
    }

    function checkCache(locationId: string): boolean {
      const cachedLocation = locationCache.get(locationId);
      if (cachedLocation) {
        setLocation(cachedLocation);
        return true;
      }
      return false;
    }

    function fetchLocation(locationId: string): void {
      locationFinderApi
        .locationFinderControllerFindLocationsByName(
          { name: locationId },
          { signal: abortController.signal }
        )
        .then(processLocationResult, processLocationFailure);

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
        if (matchingLocations.length !== 0) return false;
        console.error(`No location found with id ${locationId}`);
        return true;
      }

      function checkMultipleLocationsFound(matchingLocations: Location[]): boolean {
        if (matchingLocations.length >= 1) return false;
        console.log(`Multiple locations found with id ${locationId}`);
        return true;
      }

      function singleLocationFound(matchingLocations: Location[]): true {
        console.log(`Single location found with id ${locationId}`);
        locationCache.set(locationId, matchingLocations[0]);
        setLocation(matchingLocations[0]);
        return true;
      }

      function processLocationFailure(error: Error): void {
        console.error(`Failed to find location with id ${locationId}`, error);
        error.cause && console.error(error.cause);
      }
    }
    return () => abortController.abort();
  }, [locationFinderApi, locationCache, locationId]);

  return location;
}
