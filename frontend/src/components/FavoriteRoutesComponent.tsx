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
import { CreateFavoriteRoute, useFavoriteRoutes } from "../services/favorites/FavoritesContext";
import { PersistedObject } from "../services/persistence/generatePersistedObjectStorage";
import styles from "./FavoriteRoutesComponent.module.css";

export interface FavoriteRoutesComponentProps {
  onRouteSelected?: (route: CreateFavoriteRoute) => void;
}

export const FavoriteRoutesComponent: React.FC<FavoriteRoutesComponentProps> = (props) => {
  const { favoriteRoutes, setFavoriteRoutes } = useFavoriteRoutes();

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    const newFavoriteRoutes: PersistedObject<CreateFavoriteRoute>[] = event.detail.complete([...favoriteRoutes]) as PersistedObject<CreateFavoriteRoute>[];
    setFavoriteRoutes(newFavoriteRoutes);
  };

  return (
    <>
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

export interface FavoriteRouteEntryComponentProps {
  onRouteSelected?: (route: CreateFavoriteRoute) => void;
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
          starClicked={() => { removeFavoriteRoute(props.route); }}
        />
        : <PendingFavoriteRouteEntry />
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
    <div className={styles.route_destinations}>
      <IonLabel>
        {props.origin.name}
      </IonLabel>
      <IonLabel>
        {props.destination.name}
      </IonLabel>
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

const PendingFavoriteRouteEntry: React.FC = () => <>
  <IonLabel>
    <IonSkeletonText animated={true} className={styles.pending} />
  </IonLabel>
  <IonIcon icon={star} />
  <IonReorder slot="start" />
</>;
