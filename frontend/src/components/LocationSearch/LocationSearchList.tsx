import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import { Location } from "../../api";
import { useFavouriteLocations } from "../../services/favourites/FavouritesContext";
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
  const { favouriteLocations, addFavouriteLocation, removeFavouriteLocationById } = useFavouriteLocations();

  const removeFavouriteStopByLocationId = (locationId: string): void => {
    const favouriteStop = favouriteLocations.find((favouriteStop) => favouriteStop.locationId === locationId);

    if (favouriteStop) {
      removeFavouriteLocationById(favouriteStop.id);
    }
  };

  const isFavouriteStop = favouriteLocations.some((favouriteStop) => favouriteStop.locationId === location.id);

  return (
    <IonItem
      button
    >
      <LocationIcon type={location.type} />
      <IonLabel
        data-testid="locationName"
        onClick={(): void => onItemClicked(location)}
      >
        {location.name}
      </IonLabel>
      {
        isFavouriteStop
          ? <IonIcon
            icon={star}
            color="warning"
            onClick={(): void => removeFavouriteStopByLocationId(location.id)}
            title="Remove from favourites"
          />
          : <IonIcon
            icon={starOutline}
            onClick={() => addFavouriteLocation({ locationId: location.id, name: location.name, type: location.type })}
            title="Add to favourites"
          />
      }
    </IonItem>
  );
}
