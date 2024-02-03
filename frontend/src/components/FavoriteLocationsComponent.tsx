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
import { heart } from "ionicons/icons";
import React from "react";
import { Location } from "../api";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { CreateFavoriteLocation, useFavoriteLocations } from "../services/favorites/FavoritesContext";
import { PersistedObject } from "../services/persistence/generatePersistedObjectStorage";
import styles from "./FavoriteLocationsComponent.module.css";

export interface FavoriteLocationsComponentProps {
  onLocationSelected?: (location: CreateFavoriteLocation) => void;
}

export const FavoriteLocationsComponent: React.FC<FavoriteLocationsComponentProps> = (props) => {
  const { favoriteLocations, setFavoriteLocations } = useFavoriteLocations();

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    const newFavoriteLocations: PersistedObject<CreateFavoriteLocation>[] = event.detail.complete([...favoriteLocations]) as PersistedObject<CreateFavoriteLocation>[];
    setFavoriteLocations(newFavoriteLocations);
  };

  return (
    <>
      <IonList>
        <IonReorderGroup
          onIonItemReorder={handleReorder}
          disabled={false}
        >
          {
            favoriteLocations.length > 0
              ? favoriteLocations.map((location) => (
                <FavoriteLocationEntryComponent
                  key={location.locationId}
                  identifier={location.locationId}
                  onLocationSelected={props.onLocationSelected}
                  location={location} />
              ))
              : <IonLabel>Keine favorisierten Location vorhanden</IonLabel>
          }
        </IonReorderGroup>
      </IonList>
    </>
  );
};

export interface FavoriteLocationEntryComponentProps {
  onLocationSelected?: (location: CreateFavoriteLocation) => void;
  location: PersistedObject<CreateFavoriteLocation>;
  identifier: string;
}

const FavoriteLocationEntryComponent: React.FC<FavoriteLocationEntryComponentProps> = (props) => {
  const location = useLocationByIdOrNull(props.location.locationId);
  const { removeFavoriteLocationById } = useFavoriteLocations();

  const isReady = location !== null;
  return <IonItem
    key={props.identifier}
    onClick={() => props.onLocationSelected ? props.onLocationSelected(props.location) : {}}
  >
    {
      isReady ?
        <LoadedFavoriteLocationEntryComponent
          location={location}
          starClicked={() => { removeFavoriteLocationById(props.location.id); }}
        />
        : <PendingFavoriteLocationEntry />
    }
  </IonItem>;
};

interface LoadedFavouriteLocationEntryProps {
  location: Location;
  starClicked: () => void;
}

const LoadedFavoriteLocationEntryComponent: React.FC<LoadedFavouriteLocationEntryProps> = (props) => (
  <>
    <div className={styles.locationDestinations}>
      <IonLabel>
        {props.location.name}
      </IonLabel>
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

const PendingFavoriteLocationEntry: React.FC = () => <>
  <IonLabel>
    <IonSkeletonText animated={true} style={{ width: "50%" }} />
  </IonLabel>
  <IonIcon icon={heart} />
  <IonReorder slot="start" />
</>;
