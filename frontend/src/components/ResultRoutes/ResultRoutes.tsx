import {
  IonButton,
  IonContent,
  IonIcon,
  IonRadio,
  IonRadioGroup
} from "@ionic/react";
import { playOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { useDepartureTimeParamOrCurrentTime } from "../../hooks/useDepartureTimeParamOrCurrentTime";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import { IJourney } from "../../interfaces/IJourney.interface";
import JourneyDetail from "../JourneyDetail";
import { TripOptionsDisplay } from "../RoutePlanner/TripOptionsDisplay";
import "./ResultRoutes.css";
import { Button } from "../controls/Button";
import { Header } from "../Header";

const ResultRoutes: React.FC = () => {
  const [originId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime] = useDepartureTimeParamOrCurrentTime();
  // Using specific deserialize because using Boolean() constructor trues everything except empty string.
  const [asArrivalTime] = useStateParams<boolean>(false, "asArrivalTime", String, (boolStr) => boolStr === "true");
  const availableRoutesString = "Verfügbare Routen";
  const selectedRouteString = "Ausgewählte Route";

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const [slideName, setSlideName] = useState<string>(availableRoutesString);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [selectedJourney, setSelectedJourney] = useState<IJourney | null>(null);
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  const setActiveJourney = (journey: IJourney): void => {
    if (swiper !== null) {
      swiper.slideNext();
    }
    window.localStorage.setItem("selectedJourney", JSON.stringify(journey));
    setSelectedJourney(journey);
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
  }, [activeSlideIndex]);

  return (
    <>
      <Header/>
      <IonContent>
        <div className="result-header">
          <div className="result-swiper">
            <IonRadioGroup value={slideName}>
              <IonRadio onClick={() => swiper?.slideTo(0)} className="radio" value={availableRoutesString} mode="md" />
              <IonRadio onClick={() => swiper?.slideTo(1)} className="radio" value={selectedRouteString} mode="md" />
            </IonRadioGroup>
            <h4 className="headline">{slideName}</h4>
          </div>
          <div className="back-button">
            <Button onClick={() => { history.back(); }} expand="full" title="Zurück zum Routenplaner"/>
          </div>
          {
            swiper?.activeIndex === 1 && selectedJourney && <div className="right-align">
              <IonButton className="circle-button" routerLink="livenavigation">
                <IonIcon icon={playOutline} />
              </IonButton>
            </div>
          }
        </div>
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
              selectedJourney !== null && <>
              <JourneyDetail journey={selectedJourney} />
              </>
            }
          </SwiperSlide>
        </SwiperReact>
      </IonContent>
    </>);
};

export default ResultRoutes;
