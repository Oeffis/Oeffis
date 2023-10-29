import { generatePersistedObjectStorage } from "../persistence/generatePersistedObjectStorage";
import { parsePersistedFavoriteLocations, stringifyFavoriteLocations } from "./persistenceLocationFunctions";
import { parsePersistedFavoriteRoutes, stringifyFavoriteRoutes } from "./persistenceRouteFunction";
import { parsePersistedFavoriteTrips, stringifyFavoriteTrips } from "./persistenceTripFunctions";

const FAVORITE_TRIPS_KEY = "favorite_trips";
const FAVORITE_ROUTE_KEY = "favorite_routes";
const FAVORITE_STOPS_KEY = "favorite_stops";

export interface CreateFavoriteTrip {
  originId: string;
  destinationId: string;
  startTime: string;
}

export interface CreateFavoriteRoute {
  originId: string;
  destinationId: string;
}

export interface CreateFavoriteLocation {
  locationId: string;
}

const favoriteTrips = generatePersistedObjectStorage<CreateFavoriteTrip, "favoriteTrip">(
  "favoriteTrip",
  FAVORITE_TRIPS_KEY,
  parsePersistedFavoriteTrips,
  stringifyFavoriteTrips
);

const favoriteRoutes = generatePersistedObjectStorage<CreateFavoriteRoute, "favoriteRoute">(
  "favoriteRoute",
  FAVORITE_ROUTE_KEY,
  parsePersistedFavoriteRoutes,
  stringifyFavoriteRoutes
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

export const FavoriteRoutesContext = favoriteRoutes.context;
export const FavoriteRoutesProvider = favoriteRoutes.provider;
export const useFavoriteRoutes = favoriteRoutes.useObjects;

export const FavoriteLocationsContext = favoriteLocations.context;
export const FavoriteLocationsProvider = favoriteLocations.provider;
export const useFavoriteLocations = favoriteLocations.useObjects;
