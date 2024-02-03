import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonTitle, IonToast, IonToolbar } from "@ionic/react";
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
  const [arrivedNotificationMessage, setArrivedNotificationMessage] = useState<string>("You arrived at ... !");

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
      console.log(step.stopName + " " + step.stopIds[step.stopIds.length - 1]);
      stopIds.push(step.stopIds[step.stopIds.length - 1]);
    }
  }

  const locations: Location[] = stopIds.length > 0 ? useMultipleLocationsByIdOrNull(stopIds) : [];
  /* console.log("LOCATIONS");
  console.log(locations); */

  const isInRadius = (position: LocationCoordinates, destination: LocationCoordinates): boolean => {
    const interval = 0.0001;
    return ((destination.latitude + interval) >= position.latitude && (destination.latitude - interval) <= position.latitude)
      && ((destination.longitude + interval) >= position.longitude && (destination.longitude - interval) <= position.longitude);
  };

  const watchPosition = (): void => {
    const currentPositionCoordinates: LocationCoordinates = {
      latitude: currentLocation.location?.coords.latitude,
      longitude: currentLocation.location?.coords.longitude
    } as LocationCoordinates;

    locations.map(location => {
      if (isInRadius(currentPositionCoordinates, location.details.coordinates)) {
        setDisplayArrivedNotification(true);
        setArrivedNotificationMessage("You arrived at " + location.name + " !");
      }
    });
  };

  useEffect(() => {
    const intervalWatchPosition = setInterval(() => watchPosition, 5000);
    return (() => clearInterval(intervalWatchPosition));
  }, []);

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
        <IonToast isOpen={displayArrivedNotification} message={arrivedNotificationMessage} position="top" duration={3000} icon={notificationsCircle} />
      </IonContent>
    </>);
};

export default LiveNavigation;
