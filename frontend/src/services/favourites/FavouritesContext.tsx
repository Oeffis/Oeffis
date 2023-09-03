import { LocationTypeEnum } from "../../api";
import { generatePersistedObjectStorage } from "../persistence/generatePersistedObjectStorage";
import { parsePersistedFavouriteLocations, stringifyFavouriteLocations } from "./persistenceLocationFunctions";
import { parsePersistedFavouriteTrips, stringifyFavouriteTrips } from "./persistenceTripFunctions";

const FAVOURITE_TRIPS_KEY = "favourite_trips";
const FAVOURITE_STOPS_KEY = "favourite_stops";

export type CreateFavouriteTrip = {
  originLocationId: string;
  destinationLocationId: string;
};

export type CreateFavouriteLocation = {
  locationId: string;
  name: string;
  type: LocationTypeEnum;
};

const favouriteTrips = generatePersistedObjectStorage<CreateFavouriteTrip, "favouriteTrip">(
  "favouriteTrip",
  FAVOURITE_TRIPS_KEY,
  parsePersistedFavouriteTrips,
  stringifyFavouriteTrips
);

const favouriteLocations = generatePersistedObjectStorage<CreateFavouriteLocation, "favouriteLocation">(
  "favouriteLocation",
  FAVOURITE_STOPS_KEY,
  parsePersistedFavouriteLocations,
  stringifyFavouriteLocations
);

export const FavouriteTripsContext = favouriteTrips.context;
export const FavouriteTripsProvider = favouriteTrips.provider;
export const useFavouriteTrips = favouriteTrips.useObjects;

export const FavouriteLocationsContext = favouriteLocations.context;
export const FavouriteLocationsProvider = favouriteLocations.provider;
export const useFavouriteLocations = favouriteLocations.useObjects;
