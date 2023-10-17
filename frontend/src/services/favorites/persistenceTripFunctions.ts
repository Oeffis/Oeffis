import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavoriteTrip } from "./FavoritesContext";

interface PersistedTrip {
  createdAt: string;
  id: string;
  originId: string;
  destinationId: string;
  tripTime: string;
}

function parseFavoriteTrip(favorite: PersistedTrip): PersistedObject<CreateFavoriteTrip> | null {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typeof favorite !== "object" || favorite === null) {
    return null;
  }

  const createdAt = new Date(favorite.createdAt);
  if (isNaN(createdAt.getTime())) {
    return null;
  }

  if (typeof favorite.id !== "string") {
    return null;
  }

  if (typeof favorite.originId !== "string") {
    return null;
  }

  if (typeof favorite.destinationId !== "string") {
    return null;
  }

  return {
    createdAt,
    id: favorite.id,
    originId: favorite.originId,
    destinationId: favorite.destinationId,
    tripTime: favorite.tripTime
  };
}

export function parsePersistedFavoriteTrips(persistedFavoriteTrips: string | null): PersistedObject<CreateFavoriteTrip>[] {
  if (!persistedFavoriteTrips) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavoriteTrips) as PersistedObject<CreateFavoriteTrip>;
  if (!Array.isArray(parsedFromPersistence)) {
    return [];
  }

  const parsedFavorites = parsedFromPersistence
    .map(parseFavoriteTrip)
    .filter((favorite): favorite is PersistedObject<CreateFavoriteTrip> => favorite !== null && new Date(favorite.tripTime) >= new Date());

  return parsedFavorites;
}

export function stringifyFavoriteTrips(favoriteTrips: PersistedObject<CreateFavoriteTrip>[]): string {
  return JSON.stringify(favoriteTrips);
}
