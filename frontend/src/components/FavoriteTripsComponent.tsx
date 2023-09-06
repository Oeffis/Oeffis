import { IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonReorder, IonReorderGroup, IonSkeletonText, IonTitle, ItemReorderEventDetail } from "@ionic/react";
import { star } from "ionicons/icons";
import { Location } from "../api";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { CreateFavoriteTrip, useFavoriteTrips } from "../services/favorites/FavoritesContext";
import { PersistedObject } from "../services/persistence/generatePersistedObjectStorage";

export interface FavoriteTripsComponentProps {
  onTripSelected: (trip: CreateFavoriteTrip) => void;
}

export const FavoriteTripsComponent: React.FC<FavoriteTripsComponentProps> = (props) => {
  const { favoriteTrips, setFavoriteTrips } = useFavoriteTrips();

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    const newFavoriteTrips = event.detail.complete([...favoriteTrips]);
    setFavoriteTrips(newFavoriteTrips);
  };

  return <>
    <IonListHeader>
      <IonTitle>Favorites</IonTitle>
    </IonListHeader>
    <IonList>
      <IonReorderGroup onIonItemReorder={handleReorder} disabled={false}>
        {favoriteTrips.map((trip, idx) => (
          <FavoriteTripEntryComponent
            key={idx}
            onTripSelected={props.onTripSelected}
            trip={trip} />
        ))}
      </IonReorderGroup>
    </IonList>
  </>;
};
export interface FavoriteTripEntryComponentProps {
  onTripSelected: (trip: CreateFavoriteTrip) => void;
  trip: PersistedObject<CreateFavoriteTrip>;
  key: number;
}

const FavoriteTripEntryComponent: React.FC<FavoriteTripEntryComponentProps> = (props) => {
  const origin = useLocationByIdOrNull(props.trip.originId);
  const destination = useLocationByIdOrNull(props.trip.destinationId);
  const { removeFavoriteTrip } = useFavoriteTrips();

  const isReady = origin !== null && destination !== null;

  return <IonItem key={props.key} onClick={() => props.onTripSelected(props.trip)}>
    {
      isReady ?
        LoadedFavoriteTripEntryComponent(origin, destination)
        : PendingFavoriteTripEntry()
    }
  </IonItem>;

  function LoadedFavoriteTripEntryComponent(origin: Location, destination: Location): JSX.Element {
    return <>
      <IonLabel>
        {origin.name} - {destination.name}
      </IonLabel>
      <IonIcon
        icon={star}
        color="warning"
        onClick={(): void => void removeFavoriteTrip(props.trip)}
        title="Remove from favorites" />
      <IonReorder slot="start" />
    </>;
  }
  function PendingFavoriteTripEntry(): JSX.Element {
    return <>
      <IonLabel>
        <IonSkeletonText animated={true} style={{ width: "50%" }} />
      </IonLabel>
      <IonIcon icon={star} />
      <IonReorder slot="start" />
    </>;
  }
};
