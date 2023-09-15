import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavoriteRoute } from "./FavoritesContext";

interface PersistedRoute {
  createdAt: string;
  id: string;
  originId: string;
  destinationId: string;
}

function parseFavoriteRoute(favorite: PersistedRoute): PersistedObject<CreateFavoriteRoute> | null {
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

export function parsePersistedFavoriteRoutes(persistedFavoriteRoutes: string | null): PersistedObject<CreateFavoriteRoute>[] {
  if (!persistedFavoriteRoutes) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavoriteRoutes);
  if (!Array.isArray(parsedFromPersistence)) {
    return [];
  }

  const parsedFavorites = parsedFromPersistence
    .map(parseFavoriteRoute)
    .filter((favorite): favorite is PersistedObject<CreateFavoriteRoute> => favorite !== null);

  return parsedFavorites;
}

export function stringifyFavoriteRoutes(favoriteRoutes: PersistedObject<CreateFavoriteRoute>[]): string {
  return JSON.stringify(favoriteRoutes);
}
