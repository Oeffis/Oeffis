import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Header } from "../components/Header";
import RoutePlanner from "../components/RoutePlanner/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import { useStateParams } from "../hooks/useStateParams";
import styles from "./JourneyPage.module.css";

export interface JourneyPageProps {
  isDarkThemeEnabeld: boolean
  setCurrentJourneyUrl: (url: string) => void,
}

const JourneyPage: React.FC<JourneyPageProps> = (props) => {
  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);

  const getLocationIds = (): string[] => {
    const ids: string[] = [];

    if (originId !== null) {
      ids.push(originId);
    }
    if (destinationId !== null) {
      ids.push(destinationId);
    }

    return ids;
  };

  return (
    <IonPage id="main-content">
      <Header title="Routenplaner" />
      <IonContent scrollY={false}>
        <div className={styles.journey_content}>
          <div className={styles.map}>
            <LeafletMapContainer
              originId={originId}
              destinationId={destinationId}
              locationIds={getLocationIds()}
              showLines={true}
              isDarkThemeEnabeled={props.isDarkThemeEnabeld}
            />
          </div>
          <div className={styles.planner}>
            <RoutePlanner
              originId={originId}
              destinationId={destinationId}
              setOriginId={setOriginId}
              setDestinationId={setDestinationId}
              setCurrentJourneyUrl={props.setCurrentJourneyUrl}
              isDarkThemeEnabeled={props.isDarkThemeEnabeld} />
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default JourneyPage;
