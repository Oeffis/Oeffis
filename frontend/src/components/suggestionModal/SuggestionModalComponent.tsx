import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { checkmarkOutline, closeOutline, navigateOutline } from "ionicons/icons";
import { IJourney } from "../../interfaces/IJourney.interface";
import styles from "./SuggestionModalComponent.module.css";

export interface SuggestionModalComponentProps {
  dismiss: () => void;
  updateSelectedJourney: () => void;
  recommendedJourney: IJourney | null;
}

export const SuggestionModalComponent: React.FC<SuggestionModalComponentProps> = (props) => (
  <>
    <IonHeader className={styles.header}>
      <IonIcon icon={navigateOutline} />
      <IonLabel>
        Schnellere Route möglich
      </IonLabel>
    </IonHeader>
    <IonContent>
      <div className={styles.textContent}>
        <IonLabel>
          Sie können eine bessere Route auswählen
        </IonLabel>
        <div className={styles.newLines}>
          <LegList journey={props.recommendedJourney} />
        </div>
      </div>
      <div className={styles.buttonSection}>
        <IonButton onClick={() => props.updateSelectedJourney()} className={styles.button}>
          <IonIcon icon={checkmarkOutline} />
        </IonButton>
        <IonButton onClick={() => props.dismiss()} className={styles.button}>
          <IonIcon icon={closeOutline} />
        </IonButton>
      </div>
    </IonContent>
  </>
);

function LegList(props: {
  journey: IJourney | null
}): JSX.Element {
  return (
    <>
      <IonList>
        {
          props.journey?.stops.map((stop) => (
            <IonItem className={styles.item}>
              <IonLabel className={styles.itemLeft}>
                {stop.stationName}
              </IonLabel>
              <IonLabel className={styles.itemRight}>
                {stop.line} --&gt;
              </IonLabel>
            </IonItem>
          ))
        }
        {
          <IonItem>
            {props.journey?.arrivalStation}
          </IonItem>
        }
      </IonList>
    </>
  );
}
