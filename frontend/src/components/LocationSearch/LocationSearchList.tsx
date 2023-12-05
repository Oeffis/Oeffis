import { IonIcon, IonItem, IonLabel, IonSkeletonText } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import React from "react";
import { Location, LocationTypeEnum } from "../../api";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useFavoriteLocations } from "../../services/favorites/FavoritesContext";
import { LocationIcon } from "./LocationIcon";

export interface LocationSearchListProps {
  locations: string[];
  onItemClicked: (location: Location) => void;
}

export function LocationSearchList({ locations, onItemClicked }: LocationSearchListProps): JSX.Element {
  const items = locations.map((locationId) => (
    <LocationSearchListItem
      key={locationId}
      locationId={locationId}
      onItemClicked={onItemClicked}
    />
  ));

  return <>{items}</>;
}

interface LocationSearchListAsyncItemProps {
  locationId: string;
  onItemClicked: (location: Location) => void;
}

function LocationSearchListItem({ locationId, onItemClicked }: LocationSearchListAsyncItemProps): JSX.Element {
  const locationAsync = useLocationByIdOrNull(locationId);
  const isReady = locationAsync !== null;

  return <IonItem
    button
  >
    {
      isReady ? <LoadedLocationSearchListItem
        location={locationAsync}
        onItemClicked={onItemClicked}
      /> : <PendingLocationSearchListItem />
    }
  </IonItem>;
}

interface LocationSearchListItemProps {
  location: Location;
  onItemClicked: (location: Location) => void;
}

function LoadedLocationSearchListItem({ location, onItemClicked }: LocationSearchListItemProps): JSX.Element {
  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocationById } = useFavoriteLocations();
  const persistedLocation = favoriteLocations.find((favoriteLocation) => favoriteLocation.locationId === location.id);
  const isFavoriteStop = persistedLocation !== undefined;

  return (
    <>
      <LocationIcon type={location.type} />
      <IonLabel

        onClick={() => onItemClicked(location)}
      >
        {location.name}
      </IonLabel>
      {isFavoriteStop
        ? <IonIcon
          icon={heart}
          color="primary"
          onClick={() => removeFavoriteLocationById(persistedLocation.id)}
          title="Remove from favorites" />
        : <IonIcon
          icon={heartOutline}
          onClick={() => addFavoriteLocation({ locationId: location.id })}
          title="Add to favorites" />}
    </>
  );
}

const PendingLocationSearchListItem: React.FC = () => <>
  <LocationIcon type={LocationTypeEnum.Unknown} />
  <IonLabel>
    <IonSkeletonText animated={true} style={{ width: "50%" }} />
  </IonLabel>
  <IonIcon icon={heart} />
</>;
