import { IonIcon, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ItemReorderEventDetail } from "@ionic/react";
import { star } from "ionicons/icons";
import { CreateFavouriteTrip, useFavouriteTrips } from "../services/favourites/FavouritesContext";

export interface FavouriteTripsComponentProps {
  onTripSelected: (trip: CreateFavouriteTrip) => void;
}

export const FavouriteTripsComponent: React.FC<FavouriteTripsComponentProps> = (props) => {
  const { favouriteTrips, removeFavouriteTrip, setFavouriteTrips } = useFavouriteTrips();

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    const newFavouriteTrips = event.detail.complete([...favouriteTrips]);
    setFavouriteTrips(newFavouriteTrips);
  };

  return <IonList>
    <IonReorderGroup onIonItemReorder={handleReorder} disabled={false}>
      {favouriteTrips.map((trip, idx) => (
        <IonItem key={idx} onClick={() => props.onTripSelected(trip)}>
          <IonLabel>
            Origin: {trip.origin.name}<br />
            Destination: {trip.destination.name}
          </IonLabel>
          <IonIcon
            icon={star}
            color="warning"
            onClick={(): void => void removeFavouriteTrip(trip)}
            title="Remove from favourites" />
          <IonReorder slot="start" />
        </IonItem>
      ))}
    </IonReorderGroup>
  </IonList>;
};
