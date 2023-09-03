import { LocationTypeEnum } from "../../api";
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

  if (typeof favourite.locationId !== "string") {
    return null;
  }

  if (typeof favourite.name !== "string") {
    return null;
  }

  if (typeof favourite.type !== "string") {
    return null;
  }

  const locationType = Object.entries(LocationTypeEnum).some(([, value]) => value === favourite.type) ? favourite.type : undefined;
  if (typeof locationType === "undefined") {
    return null;
  }

  return {
    createdAt,
    locationId: favourite.locationId,
    id: favourite.id,
    name: favourite.name,
    type: locationType
  };
}

export function parsePersistedFavouriteLocations(persistedFavouriteTrips: string | null): PersistedObject<CreateFavouriteLocation>[] {
  if (!persistedFavouriteTrips) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavouriteTrips);
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
