import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import { Location, LocationTypeEnum } from "../../api";
import { useFavoriteLocations } from "../../services/favorites/FavoritesContext";
import { LocationIcon } from "./LocationIcon";

export type LocationSearchListProps = {
  locations: Location[];
  onItemClicked: (location: Location) => void;
};

export function LocationSearchList({ locations, onItemClicked }: LocationSearchListProps): JSX.Element {
  const items = locations.map((location) => (
    <LocationSearchListItem
      key={location.id}
      location={location}
      onItemClicked={onItemClicked}
    />
  ));

  return <>{items}</>;
}

type LocationSerarchListItemProps = {
  location: Location;
  onItemClicked: (location: Location) => void;
};

function LocationSearchListItem({ location, onItemClicked }: LocationSerarchListItemProps): JSX.Element {
  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocationById } = useFavoriteLocations();

  const removeFavoriteStopByLocationId = (locationId: string): void => {
    const favoriteStop = favoriteLocations.find((favoriteStop) => favoriteStop.locationId === locationId);

    if (favoriteStop) {
      removeFavoriteLocationById(favoriteStop.id);
    }
  };

  const isFavoriteStop = favoriteLocations.some((favoriteStop) => favoriteStop.locationId === location.id);

  return (
    <IonItem
      button
    >
      <LocationIcon type={location.type ?? LocationTypeEnum.Unknown}/> { /* TODO #312 Revert to saver types. */}
      <IonLabel
        data-testid="locationName"
        onClick={(): void => onItemClicked(location)}
      >
        {location.name}
      </IonLabel>
      {
        isFavoriteStop
          ? <IonIcon
            icon={star}
            color="warning"
            onClick={(): void => removeFavoriteStopByLocationId(location.id ?? "")} /* TODO #312 Revert to saver types. */
            title="Remove from favorites"
          />
          : <IonIcon
            icon={starOutline}
            onClick={() => addFavoriteLocation({ locationId: location.id ?? "", name: location.name ?? "", type: location.type ?? LocationTypeEnum.Unknown })}  /* TODO #312 Revert to saver types. */
            title="Add to favorites"
          />
      }
    </IonItem>
  );
}
