import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonSkeletonText,
  ItemReorderEventDetail
} from "@ionic/react";
import { star } from "ionicons/icons";
import React from "react";
import { Location } from "../api";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { CreateFavoriteTrip, useFavoriteTrips } from "../services/favorites/FavoritesContext";
import { PersistedObject } from "../services/persistence/generatePersistedObjectStorage";
import "./FavoriteTripsComponent.css";

export interface FavoriteTripsComponentProps {
  onTripSelected: (trip: CreateFavoriteTrip) => void;
}

export const FavoriteTripsComponent: React.FC<FavoriteTripsComponentProps> = (props) => {
  const { favoriteTrips, setFavoriteTrips } = useFavoriteTrips();

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    const newFavoriteTrips: PersistedObject<CreateFavoriteTrip>[] = event.detail.complete([...favoriteTrips]) as PersistedObject<CreateFavoriteTrip>[];
    setFavoriteTrips(newFavoriteTrips);
  };

  return (
    <>
      <IonList>
        <IonReorderGroup
          onIonItemReorder={handleReorder}
          disabled={false}
        >
          {
            favoriteTrips.length > 0
              ? favoriteTrips.map((trip, idx) => (
                <FavoriteTripEntryComponent
                  identifier={idx}
                  onTripSelected={props.onTripSelected}
                  trip={trip} />
              ))
              : <IonLabel>Keine favorisierten Trips vorhanden</IonLabel>
          }
        </IonReorderGroup>
      </IonList>
    </>
  );
};
export interface FavoriteTripEntryComponentProps {
  onTripSelected: (trip: CreateFavoriteTrip) => void;
  trip: PersistedObject<CreateFavoriteTrip>;
  identifier: number;
}

const FavoriteTripEntryComponent: React.FC<FavoriteTripEntryComponentProps> = (props) => {
  const origin = useLocationByIdOrNull(props.trip.originId);
  const destination = useLocationByIdOrNull(props.trip.destinationId);
  const startTime = props.trip.startTime;

  const { removeFavoriteTrip } = useFavoriteTrips();

  const isReady = origin !== null && destination !== null;

  return <IonItem
    key={props.identifier}
    onClick={() => props.onTripSelected(props.trip)}
  >
    {
      isReady ?
        <LoadedFavoriteTripEntryComponent
          origin={origin}
          destination={destination}
          startTime={new Date(startTime)}
          starClicked={() => { removeFavoriteTrip(props.trip); }}
        />
        : <PendingFavoriteTripEntry />
    }
  </IonItem>;
};

interface LoadedFavouriteTripEntryProps {
  origin: Location;
  destination: Location;
  startTime: Date;
  starClicked: () => void;
}

const LoadedFavoriteTripEntryComponent: React.FC<LoadedFavouriteTripEntryProps> = (props) => (
  <>
    <div className="trip-information">
      <IonLabel>
        {props.startTime.getDate() < 10 ? "0" + props.startTime.getDate() : props.startTime.getDate()}.
        {props.startTime.getMonth() < 10 ? "0" + props.startTime.getMonth() : props.startTime.getMonth()}.
        {props.startTime.getFullYear() + " - "}
        {props.startTime.getHours() < 10 ? "0" + props.startTime.getHours() : props.startTime.getHours()}:
        {props.startTime.getMinutes() < 10 ? "0" + props.startTime.getMinutes() : props.startTime.getMinutes()} Uhr
      </IonLabel>
      <div className="trip-destinations">
        <IonLabel>
          {props.origin.name}
        </IonLabel>
        <IonLabel>
          {props.destination.name}
        </IonLabel>
      </div>
    </div>
    <IonIcon
      icon={star}
      color="warning"
      onClick={(e): void => { props.starClicked(); e.stopPropagation(); }}
      title="Remove from favorites"
    />

    <IonReorder slot="start" />
  </>
);

const PendingFavoriteTripEntry: React.FC = () => <>
  <IonLabel>
    <IonSkeletonText animated={true} style={{ width: "50%" }} />
  </IonLabel>
  <IonIcon icon={star} />
  <IonReorder slot="start" />
</>;
