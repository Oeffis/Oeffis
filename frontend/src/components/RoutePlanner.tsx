import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonItem,
  IonLabel,
  IonList,
  IonModal
} from "@ionic/react";
import React from "react";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { useStateParams } from "../hooks/useStateParams";
import { CreateFavoriteTrip, useFavoriteTrips } from "../services/favorites/FavoritesContext";
import { FavoriteTripsComponent } from "./FavoriteTripsComponent";
import { LocationSearchInput } from "./LocationSearch/LocationSearchInput";

const RoutePlanner: React.FC = () => {
  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const { favoriteTrips, addFavoriteTrip } = useFavoriteTrips();

  const setTrip = (trip: CreateFavoriteTrip): void => {
    setOriginId(trip.originId);
    setDestinationId(trip.destinationId);
  };

  const currentIsFavoriteTrip = (): boolean => {
    const existing = favoriteTrips.find(c =>
      c.originId === originId
      && c.destinationId === destinationId
    );
    return existing !== undefined;
  };

  const canCurrentBeFavorited = (): boolean => originLocation !== null && destinationLocation !== null && !currentIsFavoriteTrip();

  const addToFavorites = (): void => {
    if (originId === null || destinationId === null) return;
    addFavoriteTrip({ originId, destinationId });
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
            onSelectedLocationChanged={(location): void => setOriginId(location.id)}
            prefixDataTestId="origin-input"
          />
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Destination"
            selectedLocation={destinationLocation}
            onSelectedLocationChanged={(location): void => setDestinationId(location.id)}
            prefixDataTestId="destination-input"
          />
        </IonItem>
        <IonButton type="submit" size="default" expand="block">Search routes</IonButton>
        <IonButton expand="block" color="warning"
          disabled={!canCurrentBeFavorited()}
          onClick={() => addToFavorites()}
        >Add To Favorites</IonButton>
      </IonList >
      <FavoriteTripsComponent onTripSelected={trip => setTrip(trip)} />
    </>
  );
};

export default RoutePlanner;
