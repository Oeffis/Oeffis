import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { notificationsCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import logo from "../../../public/images/OeffisLogo1.svg";
import { Location, LocationCoordinates } from "../../api";
import JourneyDetail from "../../components/JourneyDetail";
import LiveNavigationInfoComponent from "../../components/LiveNavigationInfo/LiveNavigationInfoComponent";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useMultipleLocationsByIdOrNull } from "../../hooks/useMultipleLocationsByIdOrNull";
import { IJourney } from "../../interfaces/IJourney.interface";

const LiveNavigation: React.FC = () => {

  const currentLocation = useCurrentLocation();

  const [displayArrivedNotification, setDisplayArrivedNotification] = useState<boolean>(false);
  const [arrivedNotificationMessage, setArrivedNotificationMessage] = useState<string>("Sie haben die Haltestelle ... erreicht.");

  const selectedJourneyAsString = window.localStorage.getItem("selectedJourney");
  let selectedJourney: IJourney | null = null;
  const stopIds: string[] = [];

  if (selectedJourneyAsString !== null) {
    selectedJourney = JSON.parse(selectedJourneyAsString) as IJourney;
    selectedJourney.arrivalTime = new Date(selectedJourney.arrivalTime);
    selectedJourney.startTime = new Date(selectedJourney.startTime);

    for (const step of selectedJourney.stops) {
      step.arrivalTime = new Date(step.arrivalTime);
      step.startTime = new Date(step.startTime);
      stopIds.push(step.stopIds[step.stopIds.length - 1]);
    }
  }

  const locations: Location[] = stopIds.length > 0 ? useMultipleLocationsByIdOrNull(stopIds) : [];

  const isCurrentLocationArrivedAtStopLocation = (position: LocationCoordinates, destination: LocationCoordinates): boolean => {
    const range = 0.000001;
    return ((destination.latitude + range) >= position.latitude && (destination.latitude - range) <= position.latitude)
      && ((destination.longitude + range) >= position.longitude && (destination.longitude - range) <= position.longitude);
  };

  const watchPosition = (): void => {
    const currentPositionCoordinates: LocationCoordinates = {
      latitude: currentLocation.location?.coords.latitude,
      longitude: currentLocation.location?.coords.longitude
    } as LocationCoordinates;

    locations.map(location => {
      if (isCurrentLocationArrivedAtStopLocation(currentPositionCoordinates, location.details.coordinates)) {
        setDisplayArrivedNotification(true);
        setArrivedNotificationMessage("Sie haben die Haltestelle " + location.name + " erreicht.");
        console.log("Sie haben die Haltestelle " + location.name + " erreicht.");
      }
    });
  };

  useEffect(() => {
    watchPosition();
  }, [currentLocation]);

  return (
    <IonPage id="main-content">
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
        <IonButton onClick={() => setDisplayArrivedNotification(!displayArrivedNotification)}>show toast</IonButton>
        <IonToast
          isOpen={displayArrivedNotification}
          message={arrivedNotificationMessage}
          position="bottom"
          duration={3000}
          icon={notificationsCircle} />
      </IonContent>
    </IonPage>);
};

export default LiveNavigation;
