import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import logo from "../../../public/images/train_image.png";
import { FootpathLeg, LegOriginLocationTypeEnum, Location, TransportationLeg } from "../../api";
import { useJourneyQuery } from "../../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import JourneyDetail from "../JourneyDetail";
import JourneyListComponent from "../JourneyListComponent";
import "./ResultRoutes.css";

const ResultRoutes: React.FC = () => {

  const [originId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime] = useStateParams<string>("now", "departure", String, String);

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const [slideName, setSlideName] = useState<string>("Verfügbare Routen");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [selectedJourney, setSelectedJourney] = useState<IJourney | null>(null);
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  const setActiveJourney = (journey: IJourney) => {
    swiper?.slideNext();
    setSelectedJourney(journey);
  }

  const setSlideNames = (): void => {
    if (activeSlideIndex === 0) {
      setSlideName("Verfügbare Routen");
    }
    if (activeSlideIndex === 1) {
      setSlideName("Ausgewählte Routen");
    }
  };

  useEffect(() => {
    setSlideNames();
  }, [activeSlideIndex]);

  return (
    <>
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
        <div className="selection">
          <IonRadioGroup value={slideName}>
            <IonRadio onClick={() => swiper?.slideTo(0)} className="radio" value="Verfügbare Routen" />
            <IonRadio onClick={() => swiper?.slideTo(1)} className="radio" value="Ausgewählte Routen" />
          </IonRadioGroup>
          <p>{slideName}</p>
        </div>
        <IonButton className="back-button" onClick={() => history.go(-1)}
          size="default" expand="block">
          Zurück zum Routenplaner
        </IonButton>
        <SwiperReact
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          onSlideChange={(swiper: Swiper) => setActiveSlideIndex(swiper.activeIndex)}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: false }}
          spaceBetween={100}
          slidesPerView={1}
          initialSlide={0}
          onInit={(swiper) => setSwiper(swiper)}
        >
          <SwiperSlide>
            {
              originLocation !== null && destinationLocation !== null &&
              <TripOptionsDisplay
                origin={originLocation}
                destination={destinationLocation}
                departure={new Date(departureTime)}
                setJourney={setActiveJourney}
              />
            }
          </SwiperSlide>
          <SwiperSlide>
            {
              selectedJourney !== null &&
              <JourneyDetail journey={selectedJourney}></JourneyDetail>
            }
          </SwiperSlide>
        </SwiperReact>
      </IonContent>
    </>);
};

export default ResultRoutes;

export function TripOptionsDisplay(props: {
  origin: Location,
  destination: Location,
  departure: Date,
  setJourney: Function
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
        <JourneyListComponent setActiveJourney={props.setJourney} journeys={iJourneys} />
      }
    </>
  );
}
