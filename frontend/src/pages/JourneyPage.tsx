import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import logo from "../../public/images/train_image.png";
import RoutePlanner from "../components/RoutePlanner/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import { useStateParams } from "../hooks/useStateParams";
import "./JourneyPage.css";

const JourneyPage: React.FC = () => {
  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <h3>Öffis</h3>
          </IonTitle>
          <IonButtons slot="end">
            <IonImg className="menuLogo" src={logo} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="journey-content">
          <div className="map">
            <LeafletMapContainer
              originId={originId}
              destinationId={destinationId}
              showLines={true}
            />
          </div>
          <div className="planner">
            <RoutePlanner
              originId={originId}
              destinationId={destinationId}
              setOriginId={setOriginId}
              setDestinationId={setDestinationId} />
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default JourneyPage;
