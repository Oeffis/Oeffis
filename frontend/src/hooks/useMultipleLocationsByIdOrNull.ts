import { useEffect, useState } from "react";
import { Location, RatedLocation } from "../api";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

const locationCache = new Map<string, Location>();

const noIds: string[] = [];
export function useMultipleLocationsByIdOrNull(locationIds?: string[]): Location[] {
  const locationFinderApi = useLocationFinderApi();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    locationIds = locationIds ?? noIds;
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
      .then(setLocations, (error) => {
        if (abortController.signal.aborted) return;
        console.error(error);
      });

    function processLocationResult(locationId: string, matchingLocations: RatedLocation[]): Location {
      checkIfAborted();
      checkNoLocationFound(locationId, matchingLocations);
      checkMultipleLocationsFound(locationId, matchingLocations);
      return processSingleLocationFound(locationId, matchingLocations);
    }

    function checkIfAborted(): void {
      if (abortController.signal.aborted) {
        throw new Error("Aborted.", { cause: abortController.signal.reason });
      }
    }

    function checkNoLocationFound(locationId: string, matchingLocations: RatedLocation[]): void {
      if (matchingLocations.length !== 0) return;
      throw new Error(`No location found with id ${locationId}`);
    }

    function checkMultipleLocationsFound(locationId: string, matchingLocations: RatedLocation[]): void {
      if (matchingLocations.length >= 1) return;
      throw new Error(`Multiple locations found with id ${locationId}`);
    }

    function processSingleLocationFound(locationId: string, matchingLocations: RatedLocation[]): Location {
      console.debug(`Single location found with id ${locationId}`);
      const location = matchingLocations[0] as Location;
      locationCache.set(location.id, location);
      return location;
    }

    function processLocationFailure(locationId: string, error: Error): Location {
      throw new Error(`Failed to find location with id ${locationId}`, { cause: error });
    }

    return () => { abortController.abort(); };
  }, [locationFinderApi, locationCache, locationIds]);

  return locations;
}
