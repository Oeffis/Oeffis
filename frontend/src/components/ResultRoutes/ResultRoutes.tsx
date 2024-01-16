import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { mapOutline, playOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import logo from "../../../public/images/train_image.png";
import { FootpathLeg, LegOriginLocationTypeEnum, Location, TransportationLeg, TransportationLegTypeEnum } from "../../api";
import { useDepartureTimeParamOrCurrentTime } from "../../hooks/useDepartureTimeParamOrCurrentTime";
import { useJourneyQuery } from "../../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import JourneyDetail from "../JourneyDetail";
import { TripOptionsDisplay } from "../RoutePlanner/TripOptionsDisplay";
import LeafletMapContainer from "../map/LeafletMapContainer";
import "./ResultRoutes.css";

export const JoruneyLocationResolver: React.FC = () => {

  const [originId] = useStateParams<string>("", "origin", String, String);
  const [destinationId] = useStateParams<string>("", "destination", String, String);

  const originLocation = useLocationByIdOrNull(originId) as Location;
  const destinationLocation = useLocationByIdOrNull(destinationId) as Location;

  if (originLocation !== null && destinationLocation !== null) {
    return (
      <>
        <ResultRoutes
          origin={originLocation}
          destination={destinationLocation}
        />
      </>
    );
  }

  return (<p>Lade daten ...</p>);

};

export type ResultRoutesProps = {
  origin: Location,
  destination: Location
};

const ResultRoutes: React.FC<ResultRoutesProps> = ({ origin, destination }) => {

  const [departureTime] = useDepartureTimeParamOrCurrentTime();
  const [slideName, setSlideName] = useState<string>("Verfügbare Routen");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const [mapHeight, setMapHeight] = useState<number>(30);

  const [selectedJourney, setSelectedJourney] = useState<IJourney | null>(null);
  const [activeJourneyIndex] = useState<number>(0);

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
            track: leg.origin.type === LegOriginLocationTypeEnum.Platform
              ? leg.origin.details.shortName
              : "",
            stopName: leg.destination.name,
            travelDurationInMinutes: leg.details.duration / 60,
            line: "transportation" in leg ? leg.transportation.line : "",
            stats: leg.type === TransportationLegTypeEnum.Transportation ? (leg as TransportationLeg).delayStats : {
              destinationDelayStats: { status: "unavailable", reason: "Fußpfad" },
              originDelayStats: { status: "unavailable", reason: "Fußpfad" }
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
    if (swiper !== null) {
      swiper.slideNext();
    }
    window.localStorage.setItem("selectedJourney", JSON.stringify(journey));
    setSelectedJourney(journey);
  };

  const setSlideNames = (): void => {
    if (activeSlideIndex === 0) {
      setSlideName("Verfügbare Routen");
    }
    if (activeSlideIndex === 1) {
      setSlideName("Ausgewählte Routen");
    }
  };

  useEffect(() => {
    console.log("ResultRoutes");
    setSlideNames();
    if (iJourneys !== false) {
      setSelectedJourney(iJourneys[activeJourneyIndex]);
      getLocationIds();
    }
  }, [activeSlideIndex]);

  return (
    <>
      {result.type === "error" && <div>Error: {result.error.message}</div>}
      {result.type === "pending" && <div>Searching...</div>}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <div className="menuBar">
            <IonTitle>Oeffies</IonTitle>
            <IonImg className="menuLogo" src={logo} />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div id="map" style={{ height: mapHeight + "%" }}>
          <LeafletMapContainer
            originId={origin.id}
            destinationId={destination.id}
            locationIds={(activeSlideIndex === 0) ? [origin.id, destination.id] : getLocationIds()}
            showLines={true}
          />
        </div>
        <div className="result-header">
          {
            <div className="left-align">
              <IonButton className="circle-button"
              //onClick={mapHeight === 0 ? () => setMapHeight(30) : () => setMapHeight(0)}
              >
                <IonIcon icon={mapOutline} />
              </IonButton>
            </div>
          }
          <div className="result-swiper">
            <IonRadioGroup value={slideName}>
              <IonRadio onClick={() => swiper?.slideTo(0)} className="radio" value="Verfügbare Routen" />
              <IonRadio onClick={() => swiper?.slideTo(1)} className="radio" value="Ausgewählte Routen" />
            </IonRadioGroup>
            <p>{slideName}</p>
          </div>
          <div className="right-align">
            {
              selectedJourney &&
              <IonButton className="circle-button" routerLink="livenavigation">
                <IonIcon icon={playOutline} />
              </IonButton>

            }
          </div>
        </div>
        <IonButton className="back-button" onClick={() => { history.back(); }}
          size="default" expand="block">
          Zurück zum Routenplaner
        </IonButton>
        <SwiperReact className="swiper-div"
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
              selectedJourney !== null &&
              <JourneyDetail journey={selectedJourney} />
            }
          </SwiperSlide>
        </SwiperReact>
      </IonContent>
    </>);
};

export default JoruneyLocationResolver;
