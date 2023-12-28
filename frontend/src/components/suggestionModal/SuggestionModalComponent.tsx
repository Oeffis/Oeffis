import { IonButton, IonContent, IonHeader, IonIcon, IonLabel } from "@ionic/react";
import { checkmarkOutline, closeOutline, navigateOutline } from "ionicons/icons";
import styles from "./SuggestionModalComponent.module.css";

export interface SuggestionModalComponentProps {
  dismiss: () => void;
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
          <IonLabel>
            Neue Verbindungen
          </IonLabel>
          <IonLabel>
            S11 --- Bremen HBF
          </IonLabel>
        </div>
      </div>
      <div className={styles.buttonSection}>
        <IonButton className={styles.button}>
          <IonIcon icon={checkmarkOutline} />
        </IonButton>
        <IonButton onClick={() => props.dismiss()} className={styles.button}>
          <IonIcon icon={closeOutline} />
        </IonButton>
      </div>
    </IonContent>
  </>
);
