import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import RoutePlanner from "../components/RoutePlanner/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import { useStateParams } from "../hooks/useStateParams";
import "./JourneyPage.css";
import { Header } from "../components/Header";

const JourneyPage: React.FC = () => {
  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);

  return (
    <IonPage id="main-content">
      <Header/>
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
