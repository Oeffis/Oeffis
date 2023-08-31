import { generatePersistedObjectStorage } from "../persistence/generatePersistedObjectStorage";
import { parsePersistedFavouriteStops, stringifyFavouriteStops } from "./persistenceStopFunctions";
import { parsePersistedFavouriteTrips, stringifyFavouriteTrips } from "./persistenceTripFunctions";

const FAVOURITE_TRIPS_KEY = "favourite_trips";
const FAVOURITE_STOPS_KEY = "favourite_stops";

export type CreateFavouriteTrip = {
  originStopId: string;
  destinationStopId: string;
};

export type CreateFavouriteStop = {
  stopId: string;
  nickname: string;
};

const favouriteTrips = generatePersistedObjectStorage<CreateFavouriteTrip, "favouriteTrip">(
  "favouriteTrip",
  FAVOURITE_TRIPS_KEY,
  parsePersistedFavouriteTrips,
  stringifyFavouriteTrips
);

const favouriteStops = generatePersistedObjectStorage<CreateFavouriteStop, "favouriteStop">(
  "favouriteStop",
  FAVOURITE_STOPS_KEY,
  parsePersistedFavouriteStops,
  stringifyFavouriteStops
);

export const FavouriteTripsContext = favouriteTrips.context;
export const FavouriteTripsProvider = favouriteTrips.provider;
export const useFavouriteTrips = favouriteTrips.useObjects;

export const FavouriteStopsContext = favouriteStops.context;
export const FavouriteStopsProvider = favouriteStops.provider;
export const useFavouriteStops = favouriteStops.useObjects;
