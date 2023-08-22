import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavouriteLocation } from "./FavouritesContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFavouriteLocation(favourite: any): PersistedObject<CreateFavouriteLocation> | null {
  if (typeof favourite !== "object" || favourite === null) {
    return null;
  }

  const createdAt = new Date(favourite.createdAt);
  if (isNaN(createdAt.getTime())) {
    return null;
  }

  if (typeof favourite.id !== "string") {
    return null;
  }

  if (typeof favourite.nickname !== "string") {
    return null;
  }

  if (typeof favourite.locationId !== "string") {
    return null;
  }

  return {
    createdAt,
    id: favourite.id,
    nickname: favourite.nickname,
    locationId: favourite.locationId
  };
}

export function parsePersistedFavouriteLocations(persistedFavouriteLocations: string | null): PersistedObject<CreateFavouriteLocation>[] {
  if (!persistedFavouriteLocations) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavouriteLocations);
  if (!Array.isArray(parsedFromPersistence)) {
    return [];
  }

  const parsedFavourites = parsedFromPersistence
    .map(parseFavouriteLocation)
    .filter((favourite): favourite is PersistedObject<CreateFavouriteLocation> => favourite !== null);

  return parsedFavourites;
}

export function stringifyFavouriteLocations(favouriteTrips: PersistedObject<CreateFavouriteLocation>[]): string {
  return JSON.stringify(favouriteTrips);
}
