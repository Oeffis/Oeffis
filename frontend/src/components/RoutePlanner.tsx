import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Location } from "../api";
import { useStateParams } from "../hooks/useStateParams";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";
import { CreateFavouriteTrip, useFavouriteTrips } from "../services/favourites/FavouritesContext";
import { FavouriteTripsComponent } from "./FavouriteTripsComponent";
import { LocationSearchInput } from "./LocationSearch/LocationSearchInput";

const RoutePlanner: React.FC = () => {
  const [originLocationId, setOriginLocationId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationLocationId, setDestinationLocationId] = useStateParams<string | null>(null, "destination", String, String);

  const [originLocation, setOriginLocation] = useInitialLocationFromLocationIdAndThenAsState(originLocationId);
  const [destinationLocation, setDestinationLocation] = useInitialLocationFromLocationIdAndThenAsState(destinationLocationId);

  const { favouriteTrips, addFavouriteTrip } = useFavouriteTrips();

  const setOrigin = (location: Location | null): void => {
    setOriginLocation(location);
    setOriginLocationId(location?.id ?? null);
  };

  const setDestination = (location: Location | null): void => {
    setDestinationLocation(location);
    setDestinationLocationId(location?.id ?? null);
  };

  const setTrip = (trip: CreateFavouriteTrip): void => {
    setOrigin(trip.origin);
    setDestinationLocation(trip.destination);
  };

  const currentIsFavoriteTrip = (): boolean => {
    const existing = favouriteTrips.find(c =>
      c.origin.id === originLocationId
      && c.destination.id === destinationLocationId
    );
    return existing !== undefined;
  };

  const addToFavorites = (): void => {
    if (originLocationId === null
      || destinationLocationId === null
      || originLocation === null
      || destinationLocation === null) {
      return;
    }
    addFavouriteTrip({
      origin: originLocation,
      destination: destinationLocation
    });
  };

  return (
    <>
      <IonList inset={true}>
        <IonItem lines="inset">
          {/* Date-Time-Picker, allowing the user to select dates in the present aswell as the future */}
          <IonLabel>Date and Time</IonLabel>
          <IonDatetimeButton aria-label="Date and Time" datetime="datetime" />
          <IonModal keepContentsMounted={true}>
            <IonDatetime name="date_time" id="datetime" min={new Date().toISOString()} />
          </IonModal>
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Origin"
            selectedLocation={originLocation}
            onSelectedLocationChanged={(location): void => setOrigin(location)}
            prefixDataTestId="origin-input"
          />
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Destination"
            selectedLocation={destinationLocation}
            onSelectedLocationChanged={(location): void => setDestination(location)}
            prefixDataTestId="destination-input"
          />
        </IonItem>
        <IonButton type="submit" size="default" expand="block">Search routes</IonButton>
        <IonButton expand="block" color="warning"
          disabled={originLocationId === null || destinationLocationId === null || currentIsFavoriteTrip()}
          onClick={() => addToFavorites()}
        >Add To Favorites</IonButton>
      </IonList >
      <IonTitle>Favorites</IonTitle>
      <FavouriteTripsComponent onTripSelected={trip => setTrip(trip)} />
    </>
  );
};

export default RoutePlanner;


export function useInitialLocationFromLocationIdAndThenAsState(locationId: string | null): [Location | null, (location: Location | null) => void] {
  const locationFinderApi = useLocationFinderApi();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();
    if (locationId !== null && location === null && locationId !== "") {
      locationFinderApi.locationFinderControllerFindLocationsByName({ name: locationId }, { signal: abortController.signal })
        .then((locations) => {
          if (locations.length > 0 && !cancelled) {
            setLocation(locations[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (): void => {
      abortController.abort();
      cancelled = true;
    };
  }, [locationId]);

  return [location, setLocation];
}
