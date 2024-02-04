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
import { format } from "date-fns";
import { heart } from "ionicons/icons";
import React from "react";
import { Location } from "../api";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { CreateFavoriteTrip, useFavoriteTrips } from "../services/favorites/FavoritesContext";
import { PersistedObject } from "../services/persistence/generatePersistedObjectStorage";
import styles from "./FavoriteTripsComponent.module.css";

export interface FavoriteTripsComponentProps {
  onTripSelected: (route: CreateFavoriteTrip, routerLink: string) => void;
}

export const FavoriteTripsComponent: React.FC<FavoriteTripsComponentProps> = (props) => {
  const { favoriteTrips, setFavoriteTrips } = useFavoriteTrips();

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    const newFavoriteTrips: PersistedObject<CreateFavoriteTrip>[] = event.detail.complete([...favoriteTrips]) as PersistedObject<CreateFavoriteTrip>[];
    setFavoriteTrips(newFavoriteTrips);
  };

  return (
    <>
      <IonList className={styles.scroll_padding}>
        <IonReorderGroup
          onIonItemReorder={handleReorder}
          disabled={false}
        >
          {
            favoriteTrips.length > 0
              ? favoriteTrips.map((trip, idx) => (
                <FavoriteTripEntryComponent
                  key={idx}
                  identifier={idx}
                  trip={trip}
                  onTripSelected={props.onTripSelected} />
              ))
              : <IonLabel>
                <p className={styles.no_favorites_text}>Keine favorisierten Trips vorhanden</p>
              </IonLabel>
          }
        </IonReorderGroup>
      </IonList>
    </>
  );
};
export interface FavoriteTripEntryComponentProps {
  trip: PersistedObject<CreateFavoriteTrip>;
  identifier: number;
  onTripSelected: (trip: CreateFavoriteTrip, routerLink: string) => void;
}

const FavoriteTripEntryComponent: React.FC<FavoriteTripEntryComponentProps> = (props) => {
  const origin = useLocationByIdOrNull(props.trip.originId);
  const destination = useLocationByIdOrNull(props.trip.destinationId);
  const startTime = props.trip.startTime;

  const { removeFavoriteTrip } = useFavoriteTrips();

  const isReady = origin !== null && destination !== null;

  return <IonItem
    onClick={() => props.onTripSelected(props.trip,
      `/journey?origin=${origin?.id}&destination=${destination?.id}&departureTime=${startTime}`)}
    key={props.identifier}
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
    <div className={styles.trip_information}>
      <IonLabel>
        {format(props.startTime, "dd/MM/yyyy HH:mm")} Uhr
      </IonLabel>
      <div>
        <IonLabel>
          {props.origin.name}
        </IonLabel>
        <IonLabel>
          {props.destination.name}
        </IonLabel>
      </div>
    </div>
    <IonIcon
      icon={heart}
      color="primary"
      onClick={(e): void => { props.starClicked(); e.stopPropagation(); }}
      title="Remove from favorites"
    />

    <IonReorder slot="start" />
  </>
);

const PendingFavoriteTripEntry: React.FC = () => <>
  <IonLabel>
    <IonSkeletonText animated={true} className={styles.pending} />
  </IonLabel>
  <IonIcon icon={heart} />
  <IonReorder slot="start" />
</>;
