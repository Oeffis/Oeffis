import {
  IonButton,
  IonContent,
  IonIcon,
  IonItemDivider,
  IonPage,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRow
} from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline, mapOutline, play } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import {
  FootpathLeg,
  LegDestinationLocationTypeEnum,
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
import { UserPreferences, UserPreferencesValues } from "../../pages/UserPreferencesPage";
import { PersistenceService } from "../../services/persistence/PersistenceService";
import { Header } from "../Header";
import JourneyDetail from "../JourneyDetail";
import { TripOptionsDisplay } from "../RoutePlanner/TripOptionsDisplay";
import { Button } from "../controls/Button";
import LeafletMapContainer from "../map/LeafletMapContainer";
import styles from "./ResultRoutes.module.css";

export const JourneyLocationResolver: React.FC = () => {

  const [originId] = useStateParams<string>("", "origin", String, String);
  const [destinationId] = useStateParams<string>("", "destination", String, String);

  const originLocation = useLocationByIdOrNull(originId) as Location;
  const destinationLocation = useLocationByIdOrNull(destinationId) as Location;

  if (originLocation !== null && destinationLocation !== null) {
    return (
      <IonPage id="main-content">
        <ResultRoutes
          origin={originLocation}
          destination={destinationLocation}
        />
      </IonPage>
    );
  }

  return (<p>Lade Daten ...</p>);

};

export type ResultRoutesProps = {
  origin: Location,
  destination: Location
};

const ResultRoutes: React.FC<ResultRoutesProps> = ({ origin, destination }) => {

  const persistance = new PersistenceService();
  const isDarkThemeEnabeled = persistance.get(UserPreferences.isDarkThemeEnabled) !== undefined && persistance.get(UserPreferences.isDarkThemeEnabled) === UserPreferencesValues.enabled;

  const [departureTime] = useDepartureTimeParamOrCurrentTime();
  // Using specific deserialize because using Boolean() constructor trues everything except empty string.
  const availableRoutesString = "Verfügbare Routen";
  const selectedRouteString = "Ausgewählte Route";

  const [slideName, setSlideName] = useState<string>(availableRoutesString);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const [mapHeight, setMapHeight] = useState<number>(30);

  const [selectedJourney, setSelectedJourney] = useState<IJourney | null>(null);

  const [swiper, setSwiper] = useState<Swiper | null>(null);

  const result = useJourneyQuery(origin, destination, new Date(departureTime), false);
  const iJourneys = result.type === "success"
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
            stopIds: leg.details.stopSequence.map(jl => jl.id),
            stationName: leg.origin.name,
            trackOrigin: leg.origin.type === LegOriginLocationTypeEnum.Platform
              ? leg.origin.details.shortName
              : "",
            trackDestination: leg.destination.type === LegDestinationLocationTypeEnum.Platform
              ? leg.destination.details.shortName
              : "",
            stopName: leg.destination.name,
            travelDurationInMinutes: leg.details.duration / 60,
            line: "transportation" in leg ? leg.transportation.line : "",
            stats: leg.type === TransportationLegTypeEnum.Transportation
              ? (leg as TransportationLeg).legStats
              : {
                originDelayStats: { status: "unavailable", reason: "Fußpfad" },
                destinationDelayStats: { status: "unavailable", reason: "Fußpfad" },
                interchangeReachableStat: { status: "unavailable", reason: "Fußpfad" },
                cancellationStat: { status: "unavailable", reason: "Fußpfad" }
              }
          })),
          travelDurationInMinutes: legs.reduce((acc, leg) => acc + leg.details.duration, 0) / 60
        };
      });

  const getLocationIds = (): string[] => {
    const ids: string[] = [];
    selectedJourney?.stops.map(stop => {
      stop.stopIds.map(id => ids.push(id));
    });
    ids[ids.length - 1] = destination.id;
    return ids;
  };

  const setActiveJourney = (journey: IJourney): void => {
    setSelectedJourney(journey);
    if (swiper !== null) {
      swiper.slideNext();
    }
    window.localStorage.setItem("selectedJourney", JSON.stringify(journey));
  };

  const setSlideNames = (): void => {
    if (activeSlideIndex === 0) {
      setSlideName(availableRoutesString);
    }
    if (activeSlideIndex === 1) {
      setSlideName(selectedRouteString);
    }
  };

  useEffect(() => {
    setSlideNames();
    if (iJourneys !== false) {
      getLocationIds();
    }
  }, [activeSlideIndex]);

  return (
    <>
      <Header />
      <div id="map" style={{
        height: mapHeight + "%",
        transition: "height 500ms ease-in-out"
      }}>
        <LeafletMapContainer
          originId={origin.id}
          destinationId={destination.id}
          locationIds={(activeSlideIndex === 0) ? [origin.id, destination.id] : getLocationIds()}
          showLines={true}
          isDarkThemeEnabeled={isDarkThemeEnabeled}
        />
      </div>
      <IonItemDivider color="light" className={styles.result_header}>
        {
          <div className={styles.left_align}>
            <IonButton className={styles.circle_button}
              onClick={mapHeight === 0 ? () => setMapHeight(30) : () => setMapHeight(0)}
            >
              <IonIcon icon={mapOutline}/>
            </IonButton>
          </div>
        }
        <div className={styles.result_swiper}>
          <IonRow className={styles.wide_row}>
            <div className={styles.arrow_button}>
              {
                activeSlideIndex === 0 ? null :
                  <div>
                    <IonButton fill="clear" onClick={() => swiper?.slideTo(activeSlideIndex - 1)}>
                      <IonIcon icon={chevronBackOutline} className={styles.arrow_icon} />
                    </IonButton>
                  </div>
              }
            </div>
            <IonRadioGroup className={styles.radio_group} value={slideName}>
              <IonRadio onClick={() => swiper?.slideTo(0)} className={styles.radio} value={availableRoutesString} mode="md" />
              <IonRadio onClick={() => swiper?.slideTo(1)} className={styles.radio} value={selectedRouteString} mode="md" disabled={selectedJourney === null}/>
            </IonRadioGroup>
            <div className={styles.arrow_button}>
              {
                selectedJourney === null || activeSlideIndex === 1 ? null :
                  <div>
                    <IonButton fill="clear" onClick={() => swiper?.slideTo(activeSlideIndex + 1)}>
                      <IonIcon icon={chevronForwardOutline} className={styles.arrow_icon} />
                    </IonButton>
                  </div>
              }
            </div>
          </IonRow>
          <h5 className={styles.headline}>{slideName}</h5>
        </div>
        <div className={styles.back_button}>
          <Button onClick={() => { history.back(); }} expand="full" title="Zurück zum Routenplaner" />
        </div>
        <div className={styles.right_align}>
          {
            swiper?.activeIndex === 1 && selectedJourney &&
            <IonButton className={styles.circle_button} routerLink="livenavigation">
              <IonIcon icon={play}/>
            </IonButton>
          }
        </div>
      </IonItemDivider>
      {result.type === "error" && <div>Error: {result.error.message}</div>}
      {result.type === "pending" && <IonProgressBar type="indeterminate"/>}
      <IonContent>
        <SwiperReact className={styles.swiper_div}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          onSlideChange={(swiper: Swiper) => setActiveSlideIndex(swiper.activeIndex)}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: false }}
          spaceBetween={100}
          slidesPerView={1}
          initialSlide={0}
          onInit={(swiper: Swiper) => setSwiper(swiper)}
        >
          <SwiperSlide>
            {
              origin !== null
              && destination !== null
              && iJourneys !== false
              && <TripOptionsDisplay
                iJourneys={iJourneys}
                setJourney={setActiveJourney}
              />
            }
          </SwiperSlide>
          <SwiperSlide>
            {
              selectedJourney !== null 
                ? <JourneyDetail journey={selectedJourney} hideProgress={true}/>
                : <p className={styles.noRouteSelected}>Keine Route ausgewählt.</p>
            }
          </SwiperSlide>
        </SwiperReact>
      </IonContent>
    </>);
};

export default JourneyLocationResolver;
