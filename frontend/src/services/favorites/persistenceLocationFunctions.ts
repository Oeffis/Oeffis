import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavoriteLocation } from "./FavoritesContext";

function parseFavoriteLocation(favorite: PersistedObject<CreateFavoriteLocation>): PersistedObject<CreateFavoriteLocation> | null {
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

  if (typeof favorite.locationId !== "string") {
    return null;
  }

  return {
    createdAt,
    locationId: favorite.locationId,
    id: favorite.id
  };
}

export function parsePersistedFavoriteLocations(persistedFavoriteTrips: string | null): PersistedObject<CreateFavoriteLocation>[] {
  if (!persistedFavoriteTrips) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavoriteTrips) as PersistedObject<CreateFavoriteLocation>;
  if (!Array.isArray(parsedFromPersistence)) {
    return [];
  }

  const parsedFavorites = parsedFromPersistence
    .map(parseFavoriteLocation)
    .filter((favorite): favorite is PersistedObject<CreateFavoriteLocation> => favorite !== null);

  return parsedFavorites;
}

export function stringifyFavoriteLocations(favoriteTrips: PersistedObject<CreateFavoriteLocation>[]): string {
  return JSON.stringify(favoriteTrips);
}
