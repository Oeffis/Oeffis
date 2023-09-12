import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import LeafletMapContainer from "../components/LeafletMapContainer";
import Menu from "../components/Menu";
import RoutePlanner from "../components/RoutePlanner";
import "./JourneyPage.css";

const JourneyPage: React.FC = () => (

  <IonPage>
    <IonContent fullscreen>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Oeffies</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="journeyContent">
          <IonContent className="map">
            <LeafletMapContainer
              locations={[]}
              onItemClicked={(): void => { console.log(""); }}
            />
          </IonContent>
          <IonContent className="planner">
            <RoutePlanner />
          </IonContent>
        </IonContent>
      </IonPage>
    </IonContent>
  </IonPage>

);

export default JourneyPage;
