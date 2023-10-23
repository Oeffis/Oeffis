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
import { CreateFavoriteRoute, CreateFavoriteTrip, useFavoriteRoutes, useFavoriteTrips } from "../services/favorites/FavoritesContext";
import { PersistedObject } from "../services/persistence/generatePersistedObjectStorage";

export interface FavoriteTripsComponentProps {
  onTripSelected: (trip: CreateFavoriteTrip) => void;
  onRouteSelected?: (route: CreateFavoriteRoute) => void;
}

export const FavoriteTripsComponent: React.FC<FavoriteTripsComponentProps> = (props) => {
  const { favoriteTrips, setFavoriteTrips } = useFavoriteTrips();
  const { favoriteRoutes, setFavoriteRoutes } = useFavoriteRoutes();

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    const newFavoriteTrips: PersistedObject<CreateFavoriteTrip>[] = event.detail.complete([...favoriteTrips]) as PersistedObject<CreateFavoriteTrip>[];
    const newFavoriteRoutes: PersistedObject<CreateFavoriteRoute>[] = event.detail.complete([...favoriteRoutes]) as PersistedObject<CreateFavoriteRoute>[];
    setFavoriteTrips(newFavoriteTrips);
    setFavoriteRoutes(newFavoriteRoutes);
  };

  return (
    <>
      <IonLabel>Trips</IonLabel>
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
      <IonLabel>Routen</IonLabel>
      <IonList>
        <IonReorderGroup
          onIonItemReorder={handleReorder}
          disabled={false}
        >
          {
            favoriteRoutes.length > 0
              ? favoriteRoutes.map((route, idx) => (
                <FavoriteRouteEntryComponent
                  identifier={idx}
                  onRouteSelected={props.onRouteSelected}
                  route={route} />
              ))
              : <IonLabel>Keine favorisierten Routen vorhanden</IonLabel>
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
  const tripTime = props.trip.tripTime;
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
          tripTime={tripTime}
          starClicked={() => removeFavoriteTrip(props.trip)}
        />
        : <PendingFavoriteTripEntry />
    }
  </IonItem>;
};

interface LoadedFavouriteTripEntryProps {
  origin: Location;
  destination: Location;
  tripTime: string;
  starClicked: () => void;
}

const LoadedFavoriteTripEntryComponent: React.FC<LoadedFavouriteTripEntryProps> = (props) => (
  <>
    <div>
      <div>
        <IonLabel>
          {new Date(props.tripTime).toISOString().substring(0, 16)}
        </IonLabel>
        <IonLabel>
          {props.origin.name} - {props.destination.name}
        </IonLabel>
      </div>
      <IonIcon
        icon={star}
        color="warning"
        onClick={(e): void => { props.starClicked(); e.stopPropagation(); }}
        title="Remove from favorites"
      />
    </div>

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

export interface FavoriteRouteEntryComponentProps {
  onRouteSelected?: (trip: CreateFavoriteRoute) => void;
  route: PersistedObject<CreateFavoriteRoute>;
  identifier: number;
}

const FavoriteRouteEntryComponent: React.FC<FavoriteRouteEntryComponentProps> = (props) => {
  const origin = useLocationByIdOrNull(props.route.originId);
  const destination = useLocationByIdOrNull(props.route.destinationId);
  const { removeFavoriteRoute } = useFavoriteRoutes();

  const isReady = origin !== null && destination !== null;

  return <IonItem
    key={props.identifier}
    onClick={() => props.onRouteSelected ? props.onRouteSelected(props.route) : {}}
  >
    {
      isReady ?
        <LoadedFavoriteRouteEntryComponent
          origin={origin}
          destination={destination}
          starClicked={() => removeFavoriteRoute(props.route)}
        />
        : <PendingFavoriteTripEntry />
    }
  </IonItem>;
};

interface LoadedFavouriteRouteEntryProps {
  origin: Location;
  destination: Location;
  starClicked: () => void;
}

const LoadedFavoriteRouteEntryComponent: React.FC<LoadedFavouriteRouteEntryProps> = (props) => (
  <>
    <IonLabel>
      {props.origin.name} - {props.destination.name}
    </IonLabel>
    <IonIcon
      icon={star}
      color="warning"
      onClick={(e): void => { props.starClicked(); e.stopPropagation(); }}
      title="Remove from favorites"
    />
    <IonReorder slot="start" />
  </>
);
