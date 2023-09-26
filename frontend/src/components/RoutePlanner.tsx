import {
  IonButton,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { formatISO, isSameMinute, parseISO } from "date-fns";
import { useState } from "react";
import { Journey, Leg, Location } from "../api";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { useCustomDepartureTimeUrlParamOrCurrentTime } from "../hooks/useCustomDepartureTimeOrCurrentTime";
import { useJourneyQuery } from "../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { useStateParams } from "../hooks/useStateParams";
import { IJourney } from "../interfaces/IJourney.interface";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import { CreateFavoriteTrip, useFavoriteTrips } from "../services/favorites/FavoritesContext";
import { FavoriteTripsComponent } from "./FavoriteTripsComponent";
import JourneyListComponent from "./JourneyListComponent";
import { LocationSearchInput } from "./LocationSearch/LocationSearchInput";

export const DEPARTURE_TIME_NOW_PARAM = "now";

export type RoutePlannerProps = {
  currentLocation: Location,
  setSelectedOriginLocation: (location: Location) => void
  setSelectedDestinationLocation: (location: Location) => void
};

const RoutePlanner = ({ currentLocation, setSelectedOriginLocation, setSelectedDestinationLocation }: RoutePlannerProps): JSX.Element => {

  const [originLocationId, setOriginLocationId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationLocationId, setDestinationLocationId] = useStateParams<string | null>(null, "destination", String, String);


  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const currentTime = useCurrentTime();
  const [customDepartureTime, setCustomDepartureTime] = useStateParams<string>(DEPARTURE_TIME_NOW_PARAM, "departure", String, String);
  const [minDepartureTime, setMinDepartureTime] = useState<Date>(currentTime);
  const departureTime = useCustomDepartureTimeUrlParamOrCurrentTime(customDepartureTime);

  const { favoriteTrips, addFavoriteTrip } = useFavoriteTrips();

  const setTrip = (trip: CreateFavoriteTrip): void => {
    setIsFavoritesModalOpen(false);
    setOriginId(trip.originId);
    setDestinationId(trip.destinationId);
  };

  const currentIsFavoriteTrip = (): boolean => {
    const existing = favoriteTrips.find(c =>
      c.originId === originId
      && c.destinationId === destinationId
    );
    return existing !== undefined;
  };

  const canCurrentBeFavorited = (): boolean => originLocation !== null && destinationLocation !== null && !currentIsFavoriteTrip();

  const addToFavorites = (): void => {
    if (originId === null || destinationId === null) return;
    addFavoriteTrip({ originId, destinationId });
  };

  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const showFavorites = (): void => {
    setIsFavoritesModalOpen(true);
  };

  const updateMinDepartureTime = (): void => {
    setMinDepartureTime(currentTime);
  };

  /**
   * Sets some time given as string as custom departure time.
   *
   * @param departure departure time (as ISO string)
   */
  const setCustomDeparture = (departure: string): void => {
    const parsedDeparture: Date = parseISO(departure);
    // If min value (current time) gets selected, encode this in url param.
    const customDepartureTimeString: string =
      isSameMinute(parsedDeparture, minDepartureTime)
        ? DEPARTURE_TIME_NOW_PARAM
        : formatISO(parsedDeparture);

    setCustomDepartureTime(customDepartureTimeString);
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
            onClick={(): void => setCustomDeparture(formatISO(currentTime))}
          >
            Now
          </IonButton>
          <IonDatetimeButton aria-label="Date and Time" datetime="datetime" />
          {/* Before datetime modal is being presented min departure time is updated to current time. */}
          <IonModal keepContentsMounted={true} onWillPresent={() => updateMinDepartureTime()}>
            <IonDatetime
              name="date_time"
              id="datetime"
              /* Don't use currentTime here because its frequent updates lead to "glitching"/"jumping" of UI/Map. */
              min={formatISO(minDepartureTime)}
              value={formatISO(departureTime)}
              multiple={false} // Assures that value cannot be an array but a single date string only.
              showDefaultButtons={true}
              data-testid={"datetime-input"}
              /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
              onIonChange={e => setCustomDeparture(e.detail.value! as string)}
            />
          </IonModal>
        </IonItem>
        <IonItem>
          <LocationSearchInput
            currentLocation={currentLocaiton}
            inputLabel="Origin"
            selectedLocation={originLocation}
            onSelectedLocationChanged={(location): void => {
              setOriginId(location.id ?? ""); /* TODO #312 Revert to saver types. */
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
                setDestinationId(location.id ?? "");
                setSelectedDestinationLocation(location);
            }}  /* TODO #312 Revert to saver types. */
            prefixDataTestId="destination-input"
          />
        </IonItem>
        <IonButton type="submit" size="default" expand="block">Search routes</IonButton>
        <IonButton expand="block" color="warning"
          disabled={!canCurrentBeFavorited()}
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
          <FavoriteTripsComponent onTripSelected={trip => setTrip(trip)} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default RoutePlanner;

export function TripOptionsDisplay(props: {
  origin: Location,
  destination: Location,
  departure: Date
}): JSX.Element {
  const { origin, destination, departure } = props;

  // TODO Add user input if datetime should be interpreted as arrival time.
  const result = useJourneyQuery(origin, destination, departure, false);

  // TODO #312 Revert to saver types.
  const iJourneys: false | IJourney[] = result.type === "success"
    && result.journeyResults
      .filter((journey) => journey.legs !== undefined)
      .map((journey): IJourney => {
        const legs: Leg[] = journey.legs as Leg[];

        const lastLeg = legs[legs.length - 1];
        const firstLeg = legs[0];

        return {
          // TODO #312 Revert to saver types.
          startStation: firstLeg.origin?.name ?? "startStation",
          startTime: firstLeg.origin?.departure.estimated ?? parseISO("invalid"),
          arrivalStation: lastLeg.destination?.name ?? "arrivalStation",
          arrivalTime: lastLeg.destination?.arrival.estimated ?? parseISO("invalid"),
          stops: legs.map((leg): IJourneyStep => ({
            arrivalTime: leg.destination?.arrival.estimated ?? parseISO("invalid"),
            startTime: leg.origin?.departure.estimated ?? parseISO("invalid"),
            stationName: leg.origin?.name ?? "stationName",
            stopName: leg.destination?.name ?? "stopName",
            track: "",
            travelDurationInMinutes: (leg.details.duration ?? -60) / 60
          })),
          travelDurationInMinutes: legs.reduce((acc, leg) => acc + (leg.details.duration ?? 0), 0) / 60
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
            journey.legs?.map((leg, idx) => ( /* TODO #312 Revert to saver types. */
              <li key={idx}>
                {leg.transportation?.name} {leg.details.duration} { /* TODO #312 Revert to saver types. */}
              </li>
            ))
          }
        </ol>
      </IonLabel>
    </IonItem>
  );
}
