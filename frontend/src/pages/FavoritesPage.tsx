import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import logo from "../../public/images/train_image.png";
import { FavoriteTripsComponent } from "../components/FavoriteTripsComponent";
import { CreateFavoriteTrip } from "../services/favorites/FavoritesContext";
import "./FavoritesPage.css";

const FavoritesPage: React.FC = () => {

  const [slideName, setSlideName] = useState<string>("Stations");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

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
            <IonRadio className="radio" value="Stations" />
            <IonRadio className="radio" value="Routes" />
            <IonRadio className="radio" value="Journeys" />
          </IonRadioGroup>
          <p>{slideName}</p>
        </div>

        <SwiperReact
          onSlideChange={(swiper: Swiper) => setActiveSlideIndex(swiper.activeIndex)}
          //onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: false }}
          spaceBetween={100}
          slidesPerView={1}
        >
          <SwiperSlide>
            Stations
          </SwiperSlide>
          <SwiperSlide>
            <FavoriteTripsComponent onTripSelected={(trip: CreateFavoriteTrip): void => (console.log(trip))} />
          </SwiperSlide>
          <SwiperSlide>
            Journeys
          </SwiperSlide>
        </SwiperReact>

      </IonContent>

    </IonPage>
  );
};

export default FavoritesPage;
