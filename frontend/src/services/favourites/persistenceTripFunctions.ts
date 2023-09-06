import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavouriteTrip } from "./FavouritesContext";

interface PersistedTrip {
  createdAt: string;
  id: string;
  originId: string;
  destinationId: string;
}

function parseFavouriteTrip(favourite: PersistedTrip): PersistedObject<CreateFavouriteTrip> | null {
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

  if (typeof favourite.originId !== "string") {
    return null;
  }

  if (typeof favourite.destinationId !== "string") {
    return null;
  }

  return {
    createdAt,
    id: favourite.id,
    originId: favourite.originId,
    destinationId: favourite.destinationId
  };
}

export function parsePersistedFavouriteTrips(persistedFavouriteTrips: string | null): PersistedObject<CreateFavouriteTrip>[] {
  if (!persistedFavouriteTrips) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavouriteTrips);
  if (!Array.isArray(parsedFromPersistence)) {
    return [];
  }

  const parsedFavourites = parsedFromPersistence
    .map(parseFavouriteTrip)
    .filter((favourite): favourite is PersistedObject<CreateFavouriteTrip> => favourite !== null);

  return parsedFavourites;
}

export function stringifyFavouriteTrips(favouriteTrips: PersistedObject<CreateFavouriteTrip>[]): string {
  return JSON.stringify(favouriteTrips);
}
