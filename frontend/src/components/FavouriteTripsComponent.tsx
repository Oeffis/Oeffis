import { IonList, IonListHeader, IonReorderGroup, IonTitle, ItemReorderEventDetail } from "@ionic/react";
import { CreateFavouriteTrip, useFavouriteTrips } from "../services/favourites/FavouritesContext";
import { FavouriteTripEntryComponent } from "./FavouriteTripEntryComponent";

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
