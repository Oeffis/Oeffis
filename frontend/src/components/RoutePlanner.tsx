import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar
} from "@ionic/react";
import { formatISO, isSameMinute, parseISO } from "date-fns";
import { calendarClearOutline, closeCircleOutline, heart, search, swapVerticalOutline } from "ionicons/icons";
import { useState } from "react";
import {
  FootpathLeg,
  Journey,
  LegOriginLocationTypeEnum,
  Location,
  TransportationLeg,
  TransportationLegTypeEnum
} from "../api";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { useCustomDepartureTimeUrlParamOrCurrentTime } from "../hooks/useCustomDepartureTimeOrCurrentTime";
import { useJourneyQuery } from "../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { useStateParams } from "../hooks/useStateParams";
import { IJourney } from "../interfaces/IJourney.interface";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import FavoritesPage from "../pages/FavoritesPage";
import { CreateFavoriteRoute, CreateFavoriteTrip, useFavoriteRoutes, useFavoriteTrips } from "../services/favorites/FavoritesContext";
import icons from "./Icons.module.css";
import JourneyListComponent from "./JourneyListComponent";
import { LocationSearchInput } from "./LocationSearch/LocationSearchInput";
import rp from "./RoutePlanner.module.css";
import rowcol from "./RowCol.module.css";

export const DEPARTURE_TIME_NOW_PARAM = "now";

export interface RoutePlannerProps {
  currentLocation: Location,
  setSelectedOriginLocation: (location: Location) => void
  setSelectedDestinationLocation: (location: Location) => void
}

const RoutePlanner = ({ currentLocation, setSelectedOriginLocation, setSelectedDestinationLocation }: RoutePlannerProps): JSX.Element => {

  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [startTime, setStartTime] = useStateParams<string>(new Date().toISOString(), "startTime", String, String);

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const currentTime = useCurrentTime();
  const [customDepartureTime, setCustomDepartureTime] = useStateParams<string>(DEPARTURE_TIME_NOW_PARAM, "departure", String, String);
  const [minDepartureTime, setMinDepartureTime] = useState<Date>(currentTime);
  const departureTime = useCustomDepartureTimeUrlParamOrCurrentTime(customDepartureTime);

  const { favoriteTrips, addFavoriteTrip } = useFavoriteTrips();
  const { favoriteRoutes, addFavoriteRoute } = useFavoriteRoutes();

  const setTrip = (trip: CreateFavoriteTrip): void => {
    setIsFavoritesDialogueOpen(false);
    setIsFavoritesModalOpen(false);
    setOriginId(trip.originId);
    setDestinationId(trip.destinationId);
    setStartTime(trip.startTime);
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
      && c.startTime === startTime
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
  {/*
    const showFavorites = (): void => {
    setIsFavoritesModalOpen(true);
  };
  */}

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
      <IonList className={rowcol.center_all_column} inset={true}>
        <IonItem className={rp.date_time_card} lines="none" >
          <IonRow className={rowcol.center_all_row}>
            <IonCol>
              <IonRow className={rowcol.center_all_row}>
                <IonIcon className={rp.date_icon} icon={calendarClearOutline} />
                <IonLabel className="ion-align-self-center">Datum und Uhrzeit</IonLabel>
              </IonRow>
              <IonRow className={rp.toggle_button_row}>
                <IonLabel className={rp.toggle_button_label}>Abfahrtszeit</IonLabel>
                <IonToggle className={rp.toggle_button} />
                <IonLabel className={rp.toggle_button_label}>Ankunftszeit</IonLabel>
              </IonRow>
              <IonRow className={rowcol.center_all_row}>
                {/* Date-Time-Picker, allowing the user to select dates in the present as well as in the future. */}
                {/* Button to delete custom date/time inputs and use current time. */}
                <IonButton className={icons.button_primary}
                  fill="outline"
                  onClick={() => setCustomDeparture(formatISO(currentTime))}
                >
                  Jetzt
                </IonButton>
                <IonDatetimeButton className={rp.date_time_button} aria-label="Date and Time" datetime="datetime" />
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
                    onIonChange={e => { setCustomDeparture(e.detail.value! as string); setStartTime(e.detail.value as string); }}
                  />
                </IonModal>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonItem>
        <IonRow className={rowcol.start_all_row}>
          <IonCol className={rp.input_field_width}>
            <IonItem>
              <LocationSearchInput
                currentLocation={currentLocation}
                inputLabel="Startpunkt"
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
                currentLocation={currentLocation}
                inputLabel="Zielpunkt"
                selectedLocation={destinationLocation}
                onSelectedLocationChanged={(location): void => {
                  setDestinationId(location.id);
                  setSelectedDestinationLocation(location);
                }}
                prefixDataTestId="destination-input"
              />
            </IonItem>
          </IonCol>
          <IonButton fill="clear" expand="block"
          >
            <IonIcon slot="start" icon={swapVerticalOutline} />
          </IonButton>
        </IonRow>
        <IonRow className={rp.button_row}>
          <IonButton className={icons.button_secondary} fill="outline" expand="block"
            onClick={() => addToFavorites()}
          >
            <IonIcon slot="start" icon={heart} />
            Merken
          </IonButton>
          <IonButton className={icons.button_primary} type="submit" size="default" expand="block">
            <IonIcon slot="start" icon={search} />
            Routen suchen
          </IonButton>
        </IonRow>
      </IonList >
      {
        originLocation !== null && destinationLocation !== null &&
        <TripOptionsDisplay
          origin={originLocation}
          destination={destinationLocation}
          departure={departureTime}
        />
      }
      <IonModal id={rp.favorite_dialogue} isOpen={isFavoriteDialogueOpen} onDidDismiss={() => setIsFavoritesDialogueOpen(false)}>
        <IonContent>
          <IonToolbar>
            <IonTitle>Add to favorites</IonTitle>
            <IonButtons slot="end">
              <IonButton color="light" onClick={() => setIsFavoritesDialogueOpen(false)}>
                <IonIcon icon={closeCircleOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <div id={rp.content_section}>
            <div>
              Do you want to save as Route or as Trip?
            </div>
            <div id="buttons">
              <IonButton disabled={!canCurrentRouteBeFavorited()} onClick={() => { if (originId && destinationId) { addFavoriteRoute({ originId, destinationId }); setIsFavoritesDialogueOpen(false); } }}>Route</IonButton>
              <IonButton disabled={!canCurrentTripBeFavorited()} onClick={() => { if (originId && destinationId) { addFavoriteTrip({ originId, destinationId, startTime }); setIsFavoritesDialogueOpen(false); } }}>Trip</IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
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
            onRouteSelected={route => setRoute(route)}
            onTripSelected={trip => setTrip(trip)} />
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
            travelDurationInMinutes: leg.details.duration / 60
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
