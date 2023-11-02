import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import logo from "../../public/images/train_image.png";
import { Location } from "../api";
import RoutePlanner from "../components/RoutePlanner/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import "./JourneyPage.css";

const JourneyPage: React.FC = () => {
  const [origin, setOrigin] = useState<Location>();
  const [destination, setDestination] = useState<Location>();

  const getLocations = (): string[] => {

    const locations: string[] = [];

    if (origin !== undefined) {
      locations.push(origin.id);
    }
    if (destination !== undefined) {
      locations.push(destination.id);
    }

    return locations;
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <div className="menuBar">
            <IonTitle>Oeffis</IonTitle>
            <IonImg className="menuLogo" src={logo} />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent id="main-content" className="journeyContent">
        <IonContent className="map">
          <LeafletMapContainer
            origin={origin}
            destination={destination}
            locationIds={getLocations()}
            showLines={true}
          />
        </IonContent>
        <IonContent className="planner">
          <RoutePlanner setSelectedOriginLocation={setOrigin} setSelectedDestinationLocation={setDestination} />
        </IonContent>
      </IonContent>

    </IonPage>
  );
};

export default JourneyPage;
