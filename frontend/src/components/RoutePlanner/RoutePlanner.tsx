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
import { parseISO } from "date-fns";
import { closeCircleOutline } from "ionicons/icons";
import { useState } from "react";
import {
  FootpathLeg,
  Journey,
  LegOriginLocationTypeEnum,
  Location,
  TransportationLeg,
  TransportationLegTypeEnum
} from "../../api";
import { useDepartureTimeParamOrCurrentTime } from "../../hooks/useDepartureTimeParamOrCurrentTime";
import { useJourneyQuery } from "../../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import FavoritesPage from "../../pages/FavoritesPage";
import {
  CreateFavoriteRoute,
  CreateFavoriteTrip,
  useFavoriteRoutes,
  useFavoriteTrips
} from "../../services/favorites/FavoritesContext";
import JourneyListComponent from "../JourneyListComponent";
import { LocationSearchInput } from "../LocationSearch/LocationSearchInput";
import "./RoutePlanner.css";

export interface RoutePlannerProps {
  setSelectedOriginLocation: (location: Location) => void
  setSelectedDestinationLocation: (location: Location) => void
}

const RoutePlanner = ({ setSelectedOriginLocation, setSelectedDestinationLocation }: RoutePlannerProps): JSX.Element => {

  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime, setDepartureTime, resetDepartureTimeToCurrentTime] = useDepartureTimeParamOrCurrentTime();

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const { favoriteTrips, addFavoriteTrip } = useFavoriteTrips();
  const { favoriteRoutes, addFavoriteRoute } = useFavoriteRoutes();

  const setTrip = (trip: CreateFavoriteTrip): void => {
    setIsFavoritesDialogueOpen(false);
    setIsFavoritesModalOpen(false);
    setOriginId(trip.originId);
    setDestinationId(trip.destinationId);
    setDepartureTime(trip.startTime);
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
      && c.startTime === departureTime
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
          {/* Date-Time-Picker, allowing the user to select dates in the present as well as in the future. */}
          <IonLabel>Date and Time</IonLabel>
          {/* Button to delete custom date/time inputs and use current time. */}
          <IonButton
            fill="outline"
            strong={true}
            onClick={() => resetDepartureTimeToCurrentTime()}
          >
            Now
          </IonButton>
          <IonDatetimeButton aria-label="Date and Time" datetime="datetime" />
          {/* Before datetime modal is being presented min departure time is updated to current time. */}
          <IonModal keepContentsMounted={true}>
            <IonDatetime
              name="date_time"
              id="datetime"
              value={departureTime}
              multiple={false} // Assures that value cannot be an array but a single date string only.
              showDefaultButtons={true}
              data-testid={"datetime-input"}
              onIonChange={e => setDepartureTime(e.detail.value as string)}
            />
          </IonModal>
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Origin"
            selectedLocation={originLocation}
            onSelectedLocationChanged={(location): void => {
              setOriginId(location.id);
              setSelectedOriginLocation(location);
            }}
            prefixDataTestId="origin-input"
          />
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Destination"
            selectedLocation={destinationLocation}
            onSelectedLocationChanged={(location): void => {
              setDestinationId(location.id);
              setSelectedDestinationLocation(location);
            }}
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
        <TripOptionsDisplay
          origin={originLocation}
          destination={destinationLocation}
          departure={departureTime}
        />
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
              <IonButton disabled={!canCurrentTripBeFavorited()} onClick={() => {
                if (originId && destinationId) {
                  addFavoriteTrip({ originId, destinationId, startTime: departureTime });
                  setIsFavoritesDialogueOpen(false);
                }
              }}>Trip</IonButton>
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
          {/* set launchTab=1 to start at Routes Tab -> 0=stations, 2=Journeys */}
          <FavoritesPage
            launchTab={1}
            showHeader={false}
            onRouteSelected={(route: CreateFavoriteRoute) => setRoute(route)}
            onTripSelected={(trip: CreateFavoriteTrip) => setTrip(trip)} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default RoutePlanner;

export function TripOptionsDisplay(props: {
  origin: Location,
  destination: Location,
  departure: string
}): JSX.Element {
  const { origin, destination, departure } = props;

  const departureDate = parseISO(departure);
  // TODO Add user input if datetime should be interpreted as arrival time.
  const result = useJourneyQuery(origin, destination, departureDate, false);

  const iJourneys: false | IJourney[] = result.type === "success"
    && result.journeyResults
      .map((journey): IJourney => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const legs: (TransportationLeg | FootpathLeg)[] = journey.legs;

        const lastLeg = legs[legs.length - 1];
        const firstLeg = legs[0];

        return {
          startStation: firstLeg.origin.name,
          startTime: firstLeg.origin.departureTimeEstimated,
          arrivalStation: lastLeg.destination.name,
          arrivalTime: lastLeg.destination.arrivalTimeEstimated,
          stops: legs.map((leg): IJourneyStep => ({
            arrivalTime: leg.destination.arrivalTimeEstimated,
            startTime: leg.origin.departureTimeEstimated,
            stationName: leg.origin.name,
            track: leg.origin.type === LegOriginLocationTypeEnum.Platform
              ? leg.origin.details.shortName
              : "",
            stopName: leg.destination.name,
            travelDurationInMinutes: leg.details.duration / 60,
            line: "transportation" in leg ? leg.transportation.line : ""
          })),
          travelDurationInMinutes: legs.reduce((acc, leg) => acc + leg.details.duration, 0) / 60
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
                {
                  leg.type === TransportationLegTypeEnum.Transportation
                    ? (leg as TransportationLeg).transportation.name
                    : "Footpath"
                }
                {leg.details.duration}
              </li>
            ))
          }
        </ol>
      </IonLabel>
    </IonItem>
  );
}
