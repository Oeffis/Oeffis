import { IonButton, IonContent, IonModal, IonPage } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { Header } from "../../components/Header";
import JourneyDetail from "../../components/JourneyDetail";
import LiveNavigationInfoComponent from "../../components/LiveNavigationInfo/LiveNavigationInfoComponent";
import StopCheckerComponent from "../../components/LiveNavigationInfo/StopCheckerComponent";
import { cleanAllIntervals } from "../../components/Menu";
import { SuggestionModalComponent } from "../../components/suggestionModal/SuggestionModalComponent";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import { useJourneyApi, useLocationFinderApi } from "../../services/apiClients/ApiClientsContext";
import { blackListJourney, findJourneyFromNextStop, parseJSONToJourney } from "../../services/smartSuggestion/smartSuggestionFunctions";
import styles from "./LiveNavigation.module.css";

const LiveNavigation: React.FC = () => {

  const intervalId = useRef<NodeJS.Timeout>();

  const [selectedJourney, setSelectedJourney] = useState<IJourney | null>(parseJSONToJourney(window.localStorage.getItem("selectedJourney")));
  const [showModal, setshowModal] = useState<boolean>(false);
  const [recommendedJourney, setRecommendedJourney] = useState<IJourney | null>(null);

  const locationFinderApi = useLocationFinderApi();
  const journeyApi = useJourneyApi();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      void findJourneyFromNextStop(locationFinderApi, journeyApi);
      setRecommendedJourney(parseJSONToJourney(window.localStorage.getItem("recJourney")));
      if (window.localStorage.getItem("recJourney") !== null) {
        setshowModal(true);
      }
    }, 120000);
    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <IonPage id="main-content">
      <Header />
      <IonContent>
        {
          selectedJourney !== null &&
          <>
            <LiveNavigationInfoComponent arrivalTime={selectedJourney?.arrivalTime} />
            <JourneyDetail journey={selectedJourney} />
            <StopCheckerComponent journey={selectedJourney} />
          </>
        }
        <IonButton
          className="back-button"
          onClick={() => {
            window.localStorage.removeItem("selectedJourney");
            cleanAllIntervals();
            history.back();
          }}
          size="default" expand="block">
          Navigation Beenden
        </IonButton>
        {/* <IonButton onClick={() => setDisplayArrivedNotification(!displayArrivedNotification)}>show toast</IonButton> */}
      </IonContent>
      <IonModal className={styles.suggestionModal} isOpen={showModal} >
        <SuggestionModalComponent
          updateSelectedJourney={() => {
            updateSelectedJourney(recommendedJourney, setSelectedJourney, selectedJourney);
            setshowModal(false);
          }}
          dismiss={() => {
            setshowModal(false);
            blackListJourney();
          }}
          recommendedJourney={recommendedJourney} />
      </IonModal>
    </IonPage>);
};
export default LiveNavigation;

function updateSelectedJourney(recJourney: IJourney | null, setSelectedJourney: (journey: IJourney | null) => void, selectedJourney: IJourney | null): void {
  let updatedStops: IJourneyStep[] = [];
  if (recJourney && selectedJourney) {
    updatedStops = selectedJourney?.stops.filter(
      stop => stop.startTime < recJourney?.stops[0].startTime
    );
    updatedStops = updatedStops?.concat(recJourney?.stops);
  }

  if (recJourney) {
    recJourney.stops = updatedStops;
  }
  window.localStorage.removeItem("selectedJourney");
  window.localStorage.setItem("selectedJourney", JSON.stringify(recJourney));
  setSelectedJourney(recJourney);
}
