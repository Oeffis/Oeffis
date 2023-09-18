import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Journey, Location } from "../api";
import { useJourneyQuery } from "../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { useStateParams } from "../hooks/useStateParams";
import { IJourney } from "../interfaces/IJourney.interface";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";
import { CreateFavoriteRoute, CreateFavoriteTrip, useFavoriteRoutes, useFavoriteTrips } from "../services/favorites/FavoritesContext";
import { FavoriteTripsComponent } from "./FavoriteTripsComponent";
import JourneyListComponent from "./JourneyListComponent";
import { LocationSearchInput } from "./LocationSearch/LocationSearchInput";
import "./RoutePlanner.css";

const RoutePlanner: React.FC = () => {
  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [tripTime, setTripTime] = useStateParams<string>(new Date().toISOString(), "tripTime", String, String);

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const { favoriteTrips, addFavoriteTrip } = useFavoriteTrips();
  const { favoriteRoutes, addFavoriteRoute } = useFavoriteRoutes();

  const setTrip = (trip: CreateFavoriteTrip): void => {
    setIsFavoritesDialogueOpen(false);
    setIsFavoritesModalOpen(false);
    setOriginId(trip.originId);
    setDestinationId(trip.destinationId);
    setTripTime(trip.tripTime);
  };

  const setRoute = (route: CreateFavoriteRoute): void => {
    setIsFavoritesDialogueOpen(false);
    setIsFavoritesModalOpen(false);
    setOriginId(route.originId);
    setDestinationId(route.destinationId);
  };

  const currentIsFavoriteTrip = (): boolean => {
    const existing = favoriteTrips.find(c =>
      c.originId === originId
      && c.destinationId === destinationId
      && c.tripTime === tripTime
    );
    return existing !== undefined;
  };

  const currentIsFavoriteRoute = (): boolean => {
    const existing = favoriteRoutes.find(c =>
      c.originId === originId
      && c.destinationId === destinationId
    );
    return existing !== undefined;
  };

  const canCurrentTripBeFavorited = (): boolean => originLocation !== null && destinationLocation !== null && !currentIsFavoriteTrip();
  const canCurrentRouteBeFavorited = (): boolean => originLocation !== null && destinationLocation !== null && !currentIsFavoriteRoute();

  const addToFavorites = (): void => {
    if (originId === null || destinationId === null) return;
    setIsFavoritesDialogueOpen(true);
  };

  const [isFavoriteDialogueOpen, setIsFavoritesDialogueOpen] = useState(false);

  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const showFavorites = (): void => {
    setIsFavoritesModalOpen(true);
  };

  return (
    <>
      <IonList inset={true}>
        <IonItem lines="inset">
          {/* Date-Time-Picker, allowing the user to select dates in the present aswell as the future */}
          <IonLabel>Date and Time</IonLabel>
          <IonDatetimeButton aria-label="Date and Time" datetime="datetime" />
          <IonModal keepContentsMounted={true}>
            <IonDatetime name="date_time" id="datetime" min={new Date().toISOString()} onIonChange={(e: CustomEvent) => { setTripTime(e.detail.value); }} />
          </IonModal>
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Origin"
            selectedLocation={originLocation}
            onSelectedLocationChanged={(location): void => setOriginId(location.id)}
            prefixDataTestId="origin-input"
          />
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Destination"
            selectedLocation={destinationLocation}
            onSelectedLocationChanged={(location): void => setDestinationId(location.id)}
            prefixDataTestId="destination-input"
          />
        </IonItem>
        <IonButton type="submit" size="default" expand="block">Search routes</IonButton>
        <IonButton expand="block" color="warning"

          onClick={() => addToFavorites()}
        >Add To Favorites</IonButton>
        <IonButton expand="block" color="warning"
          onClick={() => showFavorites()}
        >Show Favorites</IonButton>
      </IonList>
      {
        originLocation !== null && destinationLocation !== null &&
        <TripOptionsDisplay origin={originLocation} destination={destinationLocation} />
      }
      <IonModal id="favorite-dialogue" isOpen={isFavoriteDialogueOpen} onDidDismiss={() => setIsFavoritesDialogueOpen(false)}>
        <IonContent>
          <IonToolbar>
            <IonTitle>Add to favorites</IonTitle>
            <IonButtons slot="end">
              <IonButton color="light" onClick={() => setIsFavoritesDialogueOpen(false)}>
                <IonIcon icon={closeCircleOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <div id="content-section">
            <div>
              Do you want to save as Route or as Trip?
            </div>
            <div id="buttons">
              <IonButton disabled={!canCurrentRouteBeFavorited()} onClick={() => { if (originId && destinationId) { addFavoriteRoute({ originId, destinationId }); setIsFavoritesDialogueOpen(false); } }}>Route</IonButton>
              <IonButton disabled={!canCurrentTripBeFavorited()} onClick={() => { if (originId && destinationId) { addFavoriteTrip({ originId, destinationId, tripTime }); setIsFavoritesDialogueOpen(false); } }}>Trip</IonButton>
            </div>
          </div>

        </IonContent>
      </IonModal>;
      <IonModal
        isOpen={isFavoritesModalOpen}
        onDidDismiss={() => setIsFavoritesModalOpen(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Favorites</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <FavoriteTripsComponent onTripSelected={trip => setTrip(trip)} onRouteSelected={route => setRoute(route)} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default RoutePlanner;

export function TripOptionsDisplay(props: { origin: Location, destination: Location }): JSX.Element {
  const { origin, destination } = props;

  const result = useJourneyQuery(origin, destination);

  const iJourneys: false | IJourney[] = result.type === "success" && result.journeyResults.map((journey): IJourney => {
    const lastLeg = journey.legs[journey.legs.length - 1];
    const firstLeg = journey.legs[0];

    return {
      startStation: firstLeg.origin.name,
      startTime: firstLeg.origin.departure.estimated,
      arrivalStation: lastLeg.destination.name,
      arrivalTime: lastLeg.destination.arrival.estimated,
      stops: journey.legs.map((leg): IJourneyStep => ({
        arrivalTime: leg.destination.arrival.estimated,
        startTime: leg.origin.departure.estimated,
        stationName: leg.origin.name,
        stopName: leg.destination.name,
        track: "",
        travelDurationInMinutes: leg.details.duration / 60
      })),
      travelDurationInMinutes: journey.legs.reduce((acc, leg) => acc + leg.details.duration, 0) / 60
    };
  });

  return (
    <>
      {result.type === "error" && <div>Error: {result.error.message}</div>}
      {result.type === "pending" && <div>Searching...</div>}
      {iJourneys &&
        <JourneyListComponent journeys={iJourneys} />
      }
    </>
  );
}

export function RenderTrip(props: { journey: Journey }): JSX.Element {
  const { journey } = props;

  return (
    <IonItem>
      <IonLabel>
        <ol>
          {
            journey.legs.map((leg, idx) => (
              <li key={idx}>
                {leg.transportation.name} {leg.details.duration}
              </li>
            ))
          }
        </ol>
      </IonLabel>
    </IonItem>
  );
}


export function useInitialLocationFromLocationIdAndThenAsState(locationId: string | null): [Location | null, (location: Location | null) => void] {
  const locationFinderApi = useLocationFinderApi();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();
    if (locationId !== null && location === null && locationId !== "") {
      locationFinderApi.locationFinderControllerFindLocationsByName({ name: locationId }, { signal: abortController.signal })
        .then((locations) => {
          if (locations.length > 0 && !cancelled) {
            setLocation(locations[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (): void => {
      abortController.abort();
      cancelled = true;
    };
  }, [locationId]);

  return [location, setLocation];
}
