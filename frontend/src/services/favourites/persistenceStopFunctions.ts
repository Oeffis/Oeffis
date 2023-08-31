import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavouriteStop } from "./FavouritesContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFavouriteStop(favourite: any): PersistedObject<CreateFavouriteStop> | null {
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

  if (typeof favourite.stopId !== "string") {
    return null;
  }

  return {
    createdAt,
    id: favourite.id,
    nickname: favourite.nickname,
    stopId: favourite.stopId
  };
}

export function parsePersistedFavouriteStops(persistedFavouriteTrips: string | null): PersistedObject<CreateFavouriteStop>[] {
  if (!persistedFavouriteTrips) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavouriteTrips);
  if (!Array.isArray(parsedFromPersistence)) {
    return [];
  }

  const parsedFavourites = parsedFromPersistence
    .map(parseFavouriteStop)
    .filter((favourite): favourite is PersistedObject<CreateFavouriteStop> => favourite !== null);

  return parsedFavourites;
}

export function stringifyFavouriteStops(favouriteTrips: PersistedObject<CreateFavouriteStop>[]): string {
  return JSON.stringify(favouriteTrips);
}
