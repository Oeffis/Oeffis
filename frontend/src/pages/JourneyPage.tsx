import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import logo from "../../public/images/train_image.png";
import { Location } from "../api";
import RoutePlanner from "../components/RoutePlanner/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import "./JourneyPage.css";

const JourneyPage: React.FC = () => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);

  const getLocations = (): string[] => {

    const locations: string[] = [];

    if (origin !== null) {
      locations.push(origin.id);
    }
    if (destination !== null) {
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
              origin={origin}
              destination={destination}
              locationIds={getLocations()}
              showLines={true}
            />
          </div>
          <div className="planner">
            <RoutePlanner
              setSelectedOriginLocation={setOrigin}
              setSelectedDestinationLocation={setDestination} />
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default JourneyPage;
