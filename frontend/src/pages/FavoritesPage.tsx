import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import logo from "../../public/images/OeffisLogo1.svg";
import { FavoriteLocationsComponent } from "../components/FavoriteLocationsComponent";
import { FavoriteRoutesComponent } from "../components/FavoriteRoutesComponent";
import { FavoriteTripsComponent } from "../components/FavoriteTripsComponent";
import { CreateFavoriteLocation, CreateFavoriteRoute, CreateFavoriteTrip } from "../services/favorites/FavoritesContext";
import "./FavoritesPage.css";

export interface FavoritesPageProps {
  launchTab?: number;
  showHeader?: boolean;
  onTripSelected?: (trip: CreateFavoriteTrip) => void;
  onRouteSelected?: (trip: CreateFavoriteRoute) => void;
  onLocationSelected?: (trip: CreateFavoriteLocation) => void;
}
const FavoritesPage: React.FC<FavoritesPageProps> = (props) => {

  const [slideName, setSlideName] = useState<string>("Stations");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(props.launchTab ?? 0);
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  const initialSlide = props.launchTab ?? 0;
  const setSlideNames = (): void => {
    if (activeSlideIndex === 0) {
      setSlideName("Stations");
    }
    if (activeSlideIndex === 1) {
      setSlideName("Routes");
    }
    if (activeSlideIndex === 2) {
      setSlideName("Journeys");
    }
  };

  useEffect(() => {
    setSlideNames();
  }, [activeSlideIndex]);

  return (
    <IonPage id="main-content">
      {!(props.showHeader === false) && <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <div className="menuBar">
            <IonTitle>Oeffies</IonTitle>
            <IonImg className="menuLogo" src={logo} />
          </div>
        </IonToolbar>
      </IonHeader>}
      <IonContent>
        <div className="selection">
          <IonRadioGroup value={slideName}>
            <IonRadio mode="md" onClick={() => swiper?.slideTo(0)} className="radio" value="Stations" />
            <IonRadio mode="md" onClick={() => swiper?.slideTo(1)} className="radio" value="Routes" />
            <IonRadio mode="md" onClick={() => swiper?.slideTo(2)} className="radio" value="Journeys" />
          </IonRadioGroup>
          <p>{slideName}</p>
        </div>

        <SwiperReact
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          onSlideChange={(swiper: Swiper) => setActiveSlideIndex(swiper.activeIndex)}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: false }}
          spaceBetween={100}
          slidesPerView={1}
          initialSlide={initialSlide}
          onInit={(swiper: Swiper) => setSwiper(swiper)}
        >
          <div>
            <SwiperSlide>
              <FavoriteLocationsComponent onLocationSelected={(route: CreateFavoriteLocation) => { props.onLocationSelected ? props.onLocationSelected(route) : void 0; }} />
            </SwiperSlide>
            <SwiperSlide>
              <FavoriteRoutesComponent onRouteSelected={(route: CreateFavoriteRoute) => { props.onRouteSelected ? props.onRouteSelected(route) : void 0; }} />
            </SwiperSlide>
            <SwiperSlide>
              <FavoriteTripsComponent onTripSelected={(trip: CreateFavoriteTrip): void => { props.onTripSelected ? props.onTripSelected(trip) : void 0; }} />
            </SwiperSlide>
          </div>
        </SwiperReact>
      </IonContent>
    </IonPage>
  );
};

export default FavoritesPage;
