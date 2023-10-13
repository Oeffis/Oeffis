import { IonIcon, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, IonSkeletonText, ItemReorderEventDetail } from "@ionic/react";
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
    const newFavoriteTrips = event.detail.complete([...favoriteTrips]) as PersistedObject<CreateFavoriteTrip>[];
    setFavoriteTrips(newFavoriteTrips);
  };

  return (
    <>
      <IonList>
        <IonReorderGroup
          onIonItemReorder={handleReorder}
          disabled={false}
        >
          {favoriteTrips.map((trip, idx) => (
            <FavoriteTripEntryComponent
              key={"FavoriteTripEntry" + idx}
              identifier={idx}
              onTripSelected={props.onTripSelected}
              trip={trip} />
          ))}
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
  const { removeFavoriteTrip } = useFavoriteTrips();

  const isReady = origin !== null && destination !== null;

  return <IonItem
    key={props.identifier}
    onClick={() => { props.onTripSelected(props.trip); }}
  >
    {
      isReady ?
        <LoadedFavoriteTripEntryComponent
          origin={origin}
          destination={destination}
          starClicked={() => removeFavoriteTrip(props.trip)}
        />
        : <PendingFavoriteTripEntry />
    }
  </IonItem>;
};

interface LoadedFavouriteTripEntryProps {
  origin: Location;
  destination: Location;
  starClicked: () => void;
}

const LoadedFavoriteTripEntryComponent: React.FC<LoadedFavouriteTripEntryProps> = (props) => (
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

const PendingFavoriteTripEntry: React.FC = () => <>
  <IonLabel>
    <IonSkeletonText animated={true} style={{ width: "50%" }} />
  </IonLabel>
  <IonIcon icon={star} />
  <IonReorder slot="start" />
</>;
