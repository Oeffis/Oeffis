import { IonIcon, IonItem, IonLabel, IonSkeletonText } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import { Location, LocationTypeEnum } from "../../api";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useFavoriteLocations } from "../../services/favorites/FavoritesContext";
import { LocationIcon } from "./LocationIcon";

export type LocationSearchListProps = {
  locations: string[];
  onItemClicked: (location: Location) => void;
};

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

type LocationSearchListAsyncItemProps = {
  locationId: string;
  onItemClicked: (location: Location) => void;
};

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

type LocationSearchListItemProps = {
  location: Location;
  onItemClicked: (location: Location) => void;
};

function LoadedLocationSearchListItem({ location, onItemClicked }: LocationSearchListItemProps): JSX.Element {
  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocationById } = useFavoriteLocations();

  const removeFavoriteStopByLocationId = (locationId: string): void => {
    const favoriteStop = favoriteLocations.find((favoriteStop) => favoriteStop.locationId === locationId);

    if (favoriteStop) {
      removeFavoriteLocationById(favoriteStop.id);
    }
  };

  const isFavoriteStop = favoriteLocations.some((favoriteStop) => favoriteStop.locationId === location.id);

  return (
    <>
      <LocationIcon type={location.type ?? LocationTypeEnum.Unknown} /> {/* TODO #312 Revert to saver types. */}
      <IonLabel
        data-testid="locationName"
        onClick={(): void => onItemClicked(location)}
      >
        {location.name}
      </IonLabel>
      {isFavoriteStop
        ? <IonIcon
          icon={star}
          color="warning"
          onClick={(): void => removeFavoriteStopByLocationId(location.id ?? "")} /* TODO #312 Revert to saver types. */
          title="Remove from favorites" />
        : <IonIcon
          icon={starOutline}
          onClick={() => addFavoriteLocation({ locationId: location.id ?? "", name: location.name ?? "", type: location.type ?? LocationTypeEnum.Unknown })} /* TODO #312 Revert to saver types. */
          title="Add to favorites" />}
    </>
  );
}

const PendingLocationSearchListItem: React.FC = () => <>
  <LocationIcon type={LocationTypeEnum.Unknown} />
  <IonLabel>
    <IonSkeletonText animated={true} style={{ width: "50%" }} />
  </IonLabel>
  <IonIcon icon={star} />
</>;
