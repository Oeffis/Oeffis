import { IonButton, IonContent, IonIcon, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline, closeOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { FavoriteLocationsComponent } from "../components/FavoriteLocationsComponent";
import { FavoriteRoutesComponent } from "../components/FavoriteRoutesComponent";
import { FavoriteTripsComponent } from "../components/FavoriteTripsComponent";
import { Header } from "../components/Header";
import PlanFavoriteDialogueComponent from "../components/PlanFavoriteDialogue/PlanFavoriteDialogueComponent";
import styles from "./FavoritesPage.module.css";

export interface FavoritesPageProps {
  launchTab?: number;
  showHeader?: boolean;
}
const FavoritesPage: React.FC<FavoritesPageProps> = (props) => {

  const [slideName, setSlideName] = useState<string>("Stations");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(props.launchTab ?? 0);
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [displayDialogue, setDisplayDialogue] = useState<boolean>(false);
  const [routerLink, setRouterLink] = useState<string>("");
  const [origin, setOrigin] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string>("");

  const initialSlide = props.launchTab ?? 0;
  const setSlideNames = (): void => {
    if (activeSlideIndex === 0) {
      setSlideName("Stationen");
    }
    if (activeSlideIndex === 1) {
      setSlideName("Routen");
    }
    if (activeSlideIndex === 2) {
      setSlideName("Trips");
    }
  };

  useEffect(() => {
    setSlideNames();
  }, [activeSlideIndex]);

  return (
    <IonPage id="main-content">
      {!(props.showHeader === false) && <Header title="Favoriten" />}
      <IonContent scrollY={false}>
        <IonRow className={styles.result_header}>
          <div className={styles.right_align}>
            <IonLabel />
          </div>
          <div className={styles.selection}>
            <IonRow className={styles.result_swiper}>
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
                <IonRadio onClick={() => swiper?.slideTo(0)} className={styles.radio} value="Stationen" mode="md" />
                <IonRadio onClick={() => swiper?.slideTo(1)} className={styles.radio} value="Routen" mode="md" />
                <IonRadio onClick={() => swiper?.slideTo(2)} className={styles.radio} value="Trips" mode="md" />
              </IonRadioGroup>
              <div className={styles.arrow_button}>
                {
                  activeSlideIndex === 2 ? null :
                    <div>
                      <IonButton fill="clear" onClick={() => swiper?.slideTo(activeSlideIndex + 1)}>
                        <IonIcon icon={chevronForwardOutline} className={styles.arrow_icon} />
                      </IonButton>
                    </div>
                }
              </div>
            </IonRow>
            <div className={styles.headline_div}>
              <p><h5 className={styles.headline}>{slideName}</h5></p>
            </div>
          </div>
          <div className={styles.right_align}>
            <IonButton fill="clear" color="medium" onClick={() => { history.back(); }}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </div>
        </IonRow>
        <IonContent>
          <PlanFavoriteDialogueComponent display={displayDialogue} routerLink={routerLink} dismiss={setDisplayDialogue} origin={origin} destination={destination} startTime={startTime} />
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
                <FavoriteLocationsComponent />
              </SwiperSlide>
              <SwiperSlide>
                <FavoriteRoutesComponent onRouteSelected={(route, routerLink) => { setDisplayDialogue(true); setRouterLink(routerLink); setOrigin(route.originId); setDestination(route.destinationId); }} />
              </SwiperSlide>
              <SwiperSlide>
                <FavoriteTripsComponent onTripSelected={(trip, routerLink) => { setDisplayDialogue(true); setRouterLink(routerLink); setOrigin(trip.originId); setDestination(trip.destinationId); setStartTime(trip.startTime); }} />
              </SwiperSlide>
            </div>
          </SwiperReact>
        </IonContent>
      </IonContent >
    </IonPage >
  );
};

export default FavoritesPage;
