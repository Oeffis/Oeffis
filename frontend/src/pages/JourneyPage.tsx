import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import logo from "../../public/images/train_image.png";
import RoutePlanner from "../components/RoutePlanner/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import { OriginDestinationProvider } from "../services/locations/originDestinationContext";
import "./JourneyPage.css";

const JourneyPage: React.FC = () => (
  <IonPage id="main-content">
    <OriginDestinationProvider>
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
      <IonContent id="main-content" className="journeyContent">
        <IonContent className="map">
          <LeafletMapContainer
            showLines={true}
          />
        </IonContent>
        <IonContent className="planner">
          <RoutePlanner />
        </IonContent>
      </IonContent>
    </OriginDestinationProvider>
  </IonPage>
);

export default JourneyPage;
