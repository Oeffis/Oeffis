import { PersistedObject } from "../persistence/generatePersistedObjectStorage";
import { CreateFavouriteTrip } from "./FavouritesContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFavouriteTrip(favourite: any): PersistedObject<CreateFavouriteTrip> | null {
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

  if (typeof favourite.origin.id !== "string") {
    return null;
  }

  if (typeof favourite.origin.name !== "string") {
    return null;
  }

  if (typeof favourite.destination.id !== "string") {
    return null;
  }

  if (typeof favourite.destination.name !== "string") {
    return null;
  }

  return {
    createdAt,
    id: favourite.id,
    origin: favourite.origin,
    destination: favourite.destination
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
