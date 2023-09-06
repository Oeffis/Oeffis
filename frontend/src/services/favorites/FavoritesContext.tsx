import { LocationTypeEnum } from "../../api";
import { generatePersistedObjectStorage } from "../persistence/generatePersistedObjectStorage";
import { parsePersistedFavoriteLocations, stringifyFavoriteLocations } from "./persistenceLocationFunctions";
import { parsePersistedFavoriteTrips, stringifyFavoriteTrips } from "./persistenceTripFunctions";

const FAVORITE_TRIPS_KEY = "favorite_trips";
const FAVORITE_STOPS_KEY = "favorite_stops";

export type CreateFavoriteTrip = {
  originId: string;
  destinationId: string;
};

export type CreateFavoriteLocation = {
  locationId: string;
  name: string;
  type: LocationTypeEnum;
};

const favoriteTrips = generatePersistedObjectStorage<CreateFavoriteTrip, "favoriteTrip">(
  "favoriteTrip",
  FAVORITE_TRIPS_KEY,
  parsePersistedFavoriteTrips,
  stringifyFavoriteTrips
);

const favoriteLocations = generatePersistedObjectStorage<CreateFavoriteLocation, "favoriteLocation">(
  "favoriteLocation",
  FAVORITE_STOPS_KEY,
  parsePersistedFavoriteLocations,
  stringifyFavoriteLocations
);

export const FavoriteTripsContext = favoriteTrips.context;
export const FavoriteTripsProvider = favoriteTrips.provider;
export const useFavoriteTrips = favoriteTrips.useObjects;

export const FavoriteLocationsContext = favoriteLocations.context;
export const FavoriteLocationsProvider = favoriteLocations.provider;
export const useFavoriteLocations = favoriteLocations.useObjects;
