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

export const FavoriteTripsComponent: React.FC = () => {
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
    routerLink={`/journey?origin=${origin?.id}&destination=${destination?.id}&departureTime=${startTime}`}
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
