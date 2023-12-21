import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../../public/images/train_image.png";
import JourneyDetail from "../../components/JourneyDetail";
import LiveNavigationInfoComponent from "../../components/LiveNavigationInfo/LiveNavigationInfoComponent";
import { IJourney } from "../../interfaces/IJourney.interface";
import "./LiveNavigation.css";

const LiveNavigation: React.FC = () => {
  const selectedJourneyAsString = window.localStorage.getItem('selectedJourney');
  let selectedJourney: IJourney | null = null;
  if (selectedJourneyAsString !== null) {
    selectedJourney = JSON.parse(selectedJourneyAsString) as IJourney;
    selectedJourney.arrivalTime = new Date(selectedJourney.arrivalTime);
    selectedJourney.startTime = new Date(selectedJourney.startTime);

    for (let step of selectedJourney.stops) {
      step.arrivalTime = new Date(step.arrivalTime);
      step.startTime = new Date(step.startTime);
    }
    console.log(selectedJourney);
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
          <LiveNavigationInfoComponent arrivalTime={selectedJourney?.arrivalTime}></LiveNavigationInfoComponent> &&
          <JourneyDetail journey={selectedJourney} />
        }
        <IonButton className="back-button" onClick={() => { window.localStorage.removeItem('selectedJourney') }}
          size="default" expand="block">
          Navigation Beenden
        </IonButton>
        <IonButton className="back-button" onClick={() => { history.back(); }}
          size="default" expand="block">
          Zurück zum Routenplaner
        </IonButton>
      </IonContent>
    </>);
};

export default LiveNavigation;
