import { LocationTypeEnum } from "../../api";
import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavoriteLocation } from "./FavoritesContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFavoriteLocation(favorite: any): PersistedObject<CreateFavoriteLocation> | null {
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

  if (typeof favorite.name !== "string") {
    return null;
  }

  if (typeof favorite.type !== "string") {
    return null;
  }

  const locationType = Object.entries(LocationTypeEnum).some(([, value]) => value === favorite.type) ? favorite.type : undefined;
  if (typeof locationType === "undefined") {
    return null;
  }

  return {
    createdAt,
    locationId: favorite.locationId,
    id: favorite.id,
    name: favorite.name,
    type: locationType
  };
}

export function parsePersistedFavoriteLocations(persistedFavoriteTrips: string | null): PersistedObject<CreateFavoriteLocation>[] {
  if (!persistedFavoriteTrips) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavoriteTrips);
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
