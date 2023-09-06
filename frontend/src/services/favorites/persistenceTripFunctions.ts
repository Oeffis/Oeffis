import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavoriteTrip } from "./FavoritesContext";

interface PersistedTrip {
  createdAt: string;
  id: string;
  originId: string;
  destinationId: string;
}

function parseFavoriteTrip(favorite: PersistedTrip): PersistedObject<CreateFavoriteTrip> | null {
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
    destinationId: favorite.destinationId
  };
}

export function parsePersistedFavoriteTrips(persistedFavoriteTrips: string | null): PersistedObject<CreateFavoriteTrip>[] {
  if (!persistedFavoriteTrips) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavoriteTrips);
  if (!Array.isArray(parsedFromPersistence)) {
    return [];
  }

  const parsedFavorites = parsedFromPersistence
    .map(parseFavoriteTrip)
    .filter((favorite): favorite is PersistedObject<CreateFavoriteTrip> => favorite !== null);

  return parsedFavorites;
}

export function stringifyFavoriteTrips(favoriteTrips: PersistedObject<CreateFavoriteTrip>[]): string {
  return JSON.stringify(favoriteTrips);
}
