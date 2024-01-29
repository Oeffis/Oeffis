import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import RoutePlanner from "../components/RoutePlanner/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import { useStateParams } from "../hooks/useStateParams";
import styles from "./JourneyPage.module.css";
import { Header } from "../components/Header";

const JourneyPage: React.FC = () => {
  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);

  return (
    <IonPage id="main-content">
      <Header/>
      <IonContent scrollY={false}>
        <div className={styles.journey_content}>
          <div className={styles.map}>
            <LeafletMapContainer
              originId={originId}
              destinationId={destinationId}
              showLines={true}
            />
          </div>
          <div className={styles.planner}>
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
