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
import { calendarClearOutline, closeCircleOutline, heart, search, swapVerticalOutline } from "ionicons/icons";
import { useState } from "react";
import {
  Journey,
  Location,
  TransportationLeg,
  TransportationLegTypeEnum
} from "../../api";
import { useDepartureTimeParamOrCurrentTime } from "../../hooks/useDepartureTimeParamOrCurrentTime";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import FavoritesPage from "../../pages/FavoritesPage";
import {
  CreateFavoriteRoute,
  CreateFavoriteTrip,
  useFavoriteRoutes,
  useFavoriteTrips
} from "../../services/favorites/FavoritesContext";
import { LocationSearchInput } from "../LocationSearch/LocationSearchInput";
import rp from "./RoutePlanner.module.css";

export interface RoutePlannerProps {
  setSelectedOriginLocation: (location: Location) => void
  setSelectedDestinationLocation: (location: Location) => void
}

const RoutePlanner = ({ setSelectedOriginLocation, setSelectedDestinationLocation }: RoutePlannerProps): JSX.Element => {

  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime, setDepartureTime, resetDepartureTimeToCurrentTime] = useDepartureTimeParamOrCurrentTime();
  // Using specific deserialize because using Boolean() constructor trues everything except empty string.
  const [asArrivalTime, setAsArrivalTime] = useStateParams<boolean>(false, "asArrivalTime", String, (boolStr) => boolStr === "true");

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

  const toggleOriginDestinationLocation = (): void => {
    const tempOriginId = originId;
    setOriginId(destinationId);
    setDestinationId(tempOriginId);
    const tempOriginLocation = originLocation;
    const tempDestinationLocation = destinationLocation;
    const tempOriginInputText = originInput;
    const tempDestinationInputText = destinationInput;
    if (tempOriginLocation !== null) {
      setSelectedDestinationLocation(tempOriginLocation);
      setOriginInput(tempDestinationInputText);
    }
    if (tempDestinationLocation !== null) {
      setSelectedOriginLocation(tempDestinationLocation);
      setDestinationInput(tempOriginInputText);
    }
  };

  const [originInput, setOriginInput] = useState<string>("");
  const [destinationInput, setDestinationInput] = useState<string>("");

  return (
    <>
      <IonList className={rp.center_all_column} inset={true}>
        <IonItem className={rp.date_time_card} lines="none">
          <IonRow className={rp.center_all_row}>
            <IonCol>
              <IonRow className={rp.center_all_row}>
                <IonIcon className={rp.date_icon} icon={calendarClearOutline} />
                <IonLabel className="ion-align-self-center">Datum und Uhrzeit</IonLabel>
              </IonRow>
              <IonRow className={rp.toggle_button_row}>
                <IonLabel className={rp.toggle_button_label}>Abfahrtszeit</IonLabel>
                <IonToggle className={rp.toggle_button}
                  checked={asArrivalTime}
                  onIonChange={() => setAsArrivalTime(!asArrivalTime)} />
                <IonLabel className={rp.toggle_button_label}>Ankunftszeit</IonLabel>
              </IonRow>
              <IonRow className={rp.date_time_row}>
                {/* Date-Time-Picker, allowing the user to select dates in the present as well as in the future. */}
                {/* Button to delete custom date/time inputs and use current time. */}
                <IonButton className={rp.button_secondary}
                  fill="outline"
                  onClick={() => resetDepartureTimeToCurrentTime()}
                >
                  Jetzt
                </IonButton>
                <IonDatetimeButton className={rp.date_time_button} aria-label="Datum und Uhrzeit" datetime="datetime" />
                {/* Before datetime modal is being presented min departure time is updated to current time. */}
                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    name="date_time"
                    id="datetime"
                    /* Don't use currentTime here because its frequent updates lead to "glitching"/"jumping" of UI/Map. */
                    value={departureTime}
                    multiple={false} // Assures that value cannot be an array but a single date string only.
                    showDefaultButtons={true}
                    data-testid={"datetime-input"}
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                    onIonChange={e => setDepartureTime(e.detail.value! as string)}
                  />
                </IonModal>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonItem>
        <IonRow className={rp.start_all_row}>
          <IonCol className={rp.input_field_width}>
            <IonItem>
              <LocationSearchInput
                inputLabel="Startpunkt"
                selectedLocation={originLocation}
                onSelectedLocationChanged={(location): void => {
                  setOriginId(location.id);
                  setSelectedOriginLocation(location);
                }}
                onInputGiven={(input): void => setOriginInput(input)}
                prefixDataTestId="origin-input"
                searchName={originInput ?? "TestOrigin"}
              />
            </IonItem>
            <IonItem>
              <LocationSearchInput
                inputLabel="Zielpunkt"
                selectedLocation={destinationLocation}
                onSelectedLocationChanged={(location): void => {
                  setDestinationId(location.id);
                  setSelectedDestinationLocation(location);
                }}
                onInputGiven={(input): void => setDestinationInput(input)}
                prefixDataTestId="destination-input"
                searchName={destinationInput ?? "TestDestination"}
              />
            </IonItem>
          </IonCol>
          <IonButton
            fill="clear"
            expand="block"
            onClick={toggleOriginDestinationLocation}
          >
            <IonIcon slot="start" icon={swapVerticalOutline} />
          </IonButton>
        </IonRow>
        <IonRow className={rp.button_row}>
          <IonButton className={rp.button_secondary} fill="outline" expand="block"
            onClick={() => addToFavorites()}
          >
            <IonIcon slot="start" icon={heart} />
            Merken
          </IonButton>
          <IonButton routerLink={`/results?origin=${originId}&destination=${destinationId}&departure=${new Date(departureTime).toISOString()}`} disabled={originLocation === null || destinationLocation === null} className={rp.button_primary} size="default" expand="block">
            <IonIcon slot="start" icon={search} />
            Routen suchen
          </IonButton>
        </IonRow>
      </IonList >
      <IonModal className={rp.favorite_dialogue} id="favorite_dialogue" isOpen={isFavoriteDialogueOpen} onDidDismiss={() => setIsFavoritesDialogueOpen(false)}>
        <IonContent>
          <IonToolbar className={rp.modal_toolbar}>
            <IonTitle>Zu Favoriten hinzufügen</IonTitle>
            <IonButtons slot="end">
              <IonButton color="light" onClick={() => setIsFavoritesDialogueOpen(false)}>
                <IonIcon icon={closeCircleOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <div className={rp.modal_content_section} id="content_section">
            <div>
              Do you want to save as Route or as Trip?
            </div>
            <div className={rp.modal_buttons} id="buttons">
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
            onRouteSelected={(route: CreateFavoriteRoute) => setRoute(route)}
            onTripSelected={(trip: CreateFavoriteTrip) => setTrip(trip)} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default RoutePlanner;

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
