import { Favourite } from "./FavouritesContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFavourite(favourite: any): Favourite | null {
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

  if (typeof favourite.origin !== "string") {
    return null;
  }

  if (typeof favourite.destination !== "string") {
    return null;
  }

  return {
    createdAt,
    id: favourite.id,
    origin: favourite.origin,
    destination: favourite.destination
  };
}

export function parsePersistedFavourites(persistedFavourites: string | null): Favourite[] {
  if (!persistedFavourites) {
    return [];
  }

  const parsedFromPersistence = JSON.parse(persistedFavourites);
  if (!Array.isArray(parsedFromPersistence)) {
    return [];
  }

  const parsedFavourites = parsedFromPersistence
    .map(parseFavourite)
    .filter((favourite): favourite is Favourite => favourite !== null);

  return parsedFavourites;
}

export function stringifyFavourites(favourites: Favourite[]): string {
  return JSON.stringify(favourites);
}
