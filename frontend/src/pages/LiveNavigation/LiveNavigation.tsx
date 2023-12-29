import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import logo from "../../../public/images/train_image.png";
import JourneyDetail from "../../components/JourneyDetail";
import LiveNavigationInfoComponent from "../../components/LiveNavigationInfo/LiveNavigationInfoComponent";
import { SuggestionModalComponent } from "../../components/suggestionModal/SuggestionModalComponent";
import { IJourney } from "../../interfaces/IJourney.interface";
import { findRouteFromNextStop, getSelectedJourney } from "../../services/smartSuggestion/smartSuggestionFunctions";
import styles from "./LiveNavigation.module.css";

const LiveNavigation: React.FC = () => {
  const selectedJourneyAsString = window.localStorage.getItem("selectedJourney");
  const selectedJourney: IJourney | null = getSelectedJourney();
  const [showModal, setshowModal] = useState<boolean>(true);

  if (selectedJourneyAsString !== null) {
    findRouteFromNextStop();
  }

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
        {
          selectedJourney !== null &&
          <>
            <LiveNavigationInfoComponent arrivalTime={selectedJourney?.arrivalTime} />
            <JourneyDetail journey={selectedJourney} />
          </>
        }
        <IonButton className="back-button" onClick={() => { window.localStorage.removeItem("selectedJourney"); history.back(); }}
          size="default" expand="block">
          Navigation Beenden
        </IonButton>
      </IonContent>
      <IonModal className={styles.suggestionModal} isOpen={showModal} >
        <SuggestionModalComponent dismiss={() => setshowModal(false)} />
      </IonModal>
    </>);
};

export default LiveNavigation;
