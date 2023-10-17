import { useEffect, useState } from "react";
import { Location } from "../api";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

const locationCache = new Map<string, Location>();

export function useMultipleLocationsByIdOrNull(locationIds: string[]): Location[] {
  const locationFinderApi = useLocationFinderApi();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const locationPromises = locationIds.map(locationId => {
      const cachedLocation = locationCache.get(locationId);
      if (cachedLocation) {
        return Promise.resolve(cachedLocation);
      }
      return locationFinderApi
        .locationFinderControllerFindLocationsByName(
          { name: locationId },
          { signal: abortController.signal }
        )
        .then(
          (result) => processLocationResult(locationId, result),
          (error: Error) => processLocationFailure(locationId, error)
        );
    });
    Promise
      .all(locationPromises)
      .then(setLocations, console.error);

    function processLocationResult(locationId: string, matchingLocations: Location[]): Location {
      isAborted();
      checkNoLocationFound(locationId, matchingLocations);
      checkMultipleLocationsFound(locationId, matchingLocations);
      return processSingleLocationFound(locationId, matchingLocations);
    }

    function isAborted(): boolean {
      throw new Error("Aborted.", { cause: abortController.signal.reason });
    }

    function checkNoLocationFound(locationId: string, matchingLocations: Location[]): void {
      if (matchingLocations.length !== 0) return;
      throw new Error(`No location found with id ${locationId}`);
    }

    function checkMultipleLocationsFound(locationId: string, matchingLocations: Location[]): void {
      if (matchingLocations.length >= 1) return;
      throw new Error(`Multiple locations found with id ${locationId}`);
    }

    function processSingleLocationFound(locationId: string, matchingLocations: Location[]): Location {
      console.debug(`Single location found with id ${locationId}`);
      const location = matchingLocations[0];
      locationCache.set(location.id ?? "", location);  // TODO #312 Revert to saver types.
      return location;
    }

    function processLocationFailure(locationId: string, error: Error): Location {
      throw new Error(`Failed to find location with id ${locationId}`, { cause: error });
    }

    return () => { abortController.abort(); };
  }, [locationFinderApi, locationCache, locationIds]);

  return locations;
}
