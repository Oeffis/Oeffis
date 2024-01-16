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
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import { IJourney } from "../../interfaces/IJourney.interface";
import JourneyDetail from "../JourneyDetail";
import { TripOptionsDisplay } from "../RoutePlanner/TripOptionsDisplay";
import "./ResultRoutes.css";

const ResultRoutes: React.FC = () => {
  const [originId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime] = useDepartureTimeParamOrCurrentTime();
  // Using specific deserialize because using Boolean() constructor trues everything except empty string.
  const [asArrivalTime] = useStateParams<boolean>(false, "asArrivalTime", String, (boolStr) => boolStr === "true");

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const [slideName, setSlideName] = useState<string>("Verfügbare Routen");
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
            <IonTitle>Öffis</IonTitle>
            <IonImg className="menuLogo" src={logo} />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
