import { IonButton, IonContent, IonModal } from "@ionic/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import JourneyDetail from "../../components/JourneyDetail";
import LiveNavigationInfoComponent from "../../components/LiveNavigationInfo/LiveNavigationInfoComponent";
import { SuggestionModalComponent } from "../../components/suggestionModal/SuggestionModalComponent";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import { useJourneyApi, useLocationFinderApi } from "../../services/apiClients/ApiClientsContext";
import { blackListJourney, findJourneyFromNextStop, parseJSONToJourney } from "../../services/smartSuggestion/smartSuggestionFunctions";
import styles from "./LiveNavigation.module.css";

const LiveNavigation: React.FC = () => {
  const [selectedJourney, setSelectedJourney] = useState<IJourney | null>(parseJSONToJourney(window.localStorage.getItem("selectedJourney")));
  const [showModal, setshowModal] = useState<boolean>(false);
  const [recommendedJourney, setRecommendedJourney] = useState<IJourney | null>(null);
  const locationFinderApi = useLocationFinderApi();
  const journeyApi = useJourneyApi();

  useEffect(() => {
    setInterval(() => {
      void findJourneyFromNextStop(locationFinderApi, journeyApi);
      setRecommendedJourney(parseJSONToJourney(window.localStorage.getItem("recJourney")));
      if (window.localStorage.getItem("recJourney") !== null) {
        setshowModal(true);
      }
    }, 120000);
  }, []);

  return (
    <>
      <Header />
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
        <SuggestionModalComponent updateSelectedJourney={() => { updateSelectedJourney(recommendedJourney, setSelectedJourney, selectedJourney); setshowModal(false); }} dismiss={() => { setshowModal(false); blackListJourney(); }} recommendedJourney={recommendedJourney} />
      </IonModal>
    </>);
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
