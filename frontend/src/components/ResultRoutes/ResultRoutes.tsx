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
import { playOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import logo from "../../../public/images/train_image.png";
import { useDepartureTimeParamOrCurrentTime } from "../../hooks/useDepartureTimeParamOrCurrentTime";
import { JourneyLocation } from "../../api";
import { FootpathLeg, LegOriginLocationTypeEnum, TransportationLeg } from "../../api";
import { useJourneyQuery } from "../../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import JourneyDetail from "../JourneyDetail";
import { TripOptionsDisplay } from "../RoutePlanner/TripOptionsDisplay";
import LeafletMapContainer from "../map/LeafletMapContainer";
import "./ResultRoutes.css";

const ResultRoutes: React.FC = () => {
  const [originId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime] = useDepartureTimeParamOrCurrentTime();
  // Using specific deserialize because using Boolean() constructor trues everything except empty string.
  const [asArrivalTime] = useStateParams<boolean>(false, "asArrivalTime", String, (boolStr) => boolStr === "true");

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  /*  const journeyApi = useJourneyApi();
   const [journeysLocations, setJourneysLocations] = useState<JourneyLocation[]>();
   const [activeJourneyIndex, setActiveJourneyIndex] = useState<number>(0); */

  // TODO Add user input if datetime should be interpreted as arrival time.
  let result = null;
  if (originLocation !== null && destinationLocation !== null) {
    result = useJourneyQuery(originLocation, destinationLocation, new Date(departureTime), false);
  }

  const [slideName, setSlideName] = useState<string>("Verfügbare Routen");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [selectedJourney, setSelectedJourney] = useState<IJourney | null>(null);
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  /* const getJourneysLocations = (): void => {
    if (originId !== null && destinationId !== null && departureTime !== null) {
      journeyApi.journeyControllerQueryJourney({
        originId: originId,
        destinationId: destinationId,
        departure: new Date(departureTime),
        asArrival: false
      }).then(journeys => journeys.map(jorueny => jorueny.legs.map(leg => setJourneysLocations(leg.details.stopSequence))))
        .catch(error => alert(error));
    }
  }
*/

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
            stopIds: leg.details.stopSequence.map(jl => jl.id),
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

  const getLocationIds = (): string[] => {

    let ids: string[] = [];

    selectedJourney?.stops.map(stop => {
      stop.stopIds.map(id => {
        ids.push(id);
        console.log(id);
      });
    });

    return ids;
  }

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
    /*     getJourneysLocations(); */
    selectedJourney(journey);
    setSlideNames();
    /*     console.log(journeysLocations?.length); */
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
        <div className="map">
          <LeafletMapContainer
            origin={originLocation ?? undefined}
            destination={destinationLocation ?? undefined}
            locationIds={getLocationIds()}
            showLines={true}
          />
        </div>
        <div className="result-header">
          <div className="result-swiper">
            <IonRadioGroup value={slideName}>
              <IonRadio onClick={() => swiper?.slideTo(0)} className="radio" value="Verfügbare Routen" />
              <IonRadio onClick={() => swiper?.slideTo(1)} className="radio" value="Ausgewählte Routen" />
            </IonRadioGroup>
            <p>{slideName}</p>
          </div>
          {
            selectedJourney && <div className="right-align">
              <IonButton className="circle-button" routerLink="livenavigation">
                <IonIcon icon={playOutline} />
              </IonButton>
            </div>
          }

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
              originLocation !== null && destinationLocation !== null &&
              <TripOptionsDisplay
                origin={originLocation}
                destination={destinationLocation}
                departure={new Date(departureTime)}
                asArrival={asArrivalTime}
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

export default ResultRoutes;
