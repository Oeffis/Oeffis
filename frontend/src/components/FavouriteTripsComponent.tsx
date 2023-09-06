import { IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonReorder, IonReorderGroup, IonSkeletonText, IonTitle, ItemReorderEventDetail } from "@ionic/react";
import { star } from "ionicons/icons";
import { Location } from "../api";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { CreateFavouriteTrip, useFavouriteTrips } from "../services/favourites/FavouritesContext";
import { PersistedObject } from "../services/persistence/generatePersistedObjectStorage";

export interface FavouriteTripsComponentProps {
  onTripSelected: (trip: CreateFavouriteTrip) => void;
}

export const FavouriteTripsComponent: React.FC<FavouriteTripsComponentProps> = (props) => {
  const { favouriteTrips, setFavouriteTrips } = useFavouriteTrips();

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    const newFavouriteTrips = event.detail.complete([...favouriteTrips]);
    setFavouriteTrips(newFavouriteTrips);
  };

  return <>
    <IonListHeader>
      <IonTitle>Favorites</IonTitle>
    </IonListHeader>
    <IonList>
      <IonReorderGroup onIonItemReorder={handleReorder} disabled={false}>
        {favouriteTrips.map((trip, idx) => (
          <FavouriteTripEntryComponent
            key={idx}
            onTripSelected={props.onTripSelected}
            trip={trip} />
        ))}
      </IonReorderGroup>
    </IonList>
  </>;
};
export interface FavouriteTripEntryComponentProps {
  onTripSelected: (trip: CreateFavouriteTrip) => void;
  trip: PersistedObject<CreateFavouriteTrip>;
  key: number;
}

const FavouriteTripEntryComponent: React.FC<FavouriteTripEntryComponentProps> = (props) => {
  const origin = useLocationByIdOrNull(props.trip.originId);
  const destination = useLocationByIdOrNull(props.trip.destinationId);
  const { removeFavouriteTrip } = useFavouriteTrips();

  const isReady = origin !== null && destination !== null;

  return <IonItem key={props.key} onClick={() => props.onTripSelected(props.trip)}>
    {
      isReady ?
        LoadedFavouriteTripEntryComponent(origin, destination)
        : PendingFavouriteTripEntry()
    }
  </IonItem>;

  function LoadedFavouriteTripEntryComponent(origin: Location, destination: Location): JSX.Element {
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
  function PendingFavouriteTripEntry(): JSX.Element {
    return <>
      <IonLabel>
        <IonSkeletonText animated={true} style={{ width: "50%" }} />
      </IonLabel>
      <IonIcon icon={star} />
      <IonReorder slot="start" />
    </>;
  }
};
