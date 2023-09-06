import { IonIcon, IonItem, IonLabel, IonReorder, IonSkeletonText } from "@ionic/react";
import { star } from "ionicons/icons";
import { Location } from "../api";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { CreateFavouriteTrip, useFavouriteTrips } from "../services/favourites/FavouritesContext";
import { PersistedObject } from "../services/persistence/generatePersistedObjectStorage";

export interface FavouriteTripEntryComponentProps {
  onTripSelected: (trip: CreateFavouriteTrip) => void;
  trip: PersistedObject<CreateFavouriteTrip>;
  key: number;
}

export const FavouriteTripEntryComponent: React.FC<FavouriteTripEntryComponentProps> = (props) => {
  const { removeFavouriteTrip } = useFavouriteTrips();
  const origin = useLocationByIdOrNull(props.trip.originId);
  const destination = useLocationByIdOrNull(props.trip.destinationId);

  return <IonItem key={props.key} onClick={() => props.onTripSelected(props.trip)}>
    {origin !== null && destination !== null ? loadedEntry(origin, destination) : loadingEntry()}
  </IonItem>;

  function loadedEntry(origin: Location, destination: Location): JSX.Element {
    return <>
      <IonLabel>
        {origin.name} - {destination.name}
      </IonLabel>
      <IonIcon
        icon={star}
        color="warning"
        onClick={(): void => void removeFavouriteTrip(props.trip)}
        title="Remove from favourites" />
      <IonReorder slot="start" />
    </>;
  }

  function loadingEntry(): JSX.Element {
    return <>
      <IonLabel>
        <IonSkeletonText animated={true} style={{ width: "30%" }} />
      </IonLabel>
      <IonIcon icon={star} />
      <IonReorder slot="start" />
    </>;
  }
};
