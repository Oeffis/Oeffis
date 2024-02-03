import { IonButton, IonLabel, IonModal } from "@ionic/react";
import { format } from "date-fns";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import styles from "./PlanFavoriteDialogueComponent.module.css";

export interface PlanFavoriteDialogueProps {
  routerLink: string;
  display: boolean;
  dismiss: (display: boolean) => void;
  origin: string | null;
  destination: string | null;
  startTime: string;
}

const PlanFavoriteDialogueComponent: React.FC<PlanFavoriteDialogueProps> = (props) => {
  const formatDateTime = (date: Date): string => format(date, "dd.MM.yyyy HH:mm");

  return (
    <IonModal className={styles.modal} isOpen={props.display}>
      <div className={styles.container}>
        <div className={styles.header}>
          {props.startTime !== "" && "Wollen Sie diesen Trip planen?"}
          {props.startTime === "" && "Wollen Sie diese Route planen?"}
        </div>
        <div className={styles.content}>
          {<IonLabel>{useLocationByIdOrNull(props.origin)?.name}</IonLabel>}
          &rarr;
          {<IonLabel>{useLocationByIdOrNull(props.destination)?.name}</IonLabel>}
          {props.startTime !== "" && formatDateTime(new Date(props.startTime)) + " Uhr"}
          <div className={styles.button_section}>
            <IonButton className={styles.button} routerLink={props.routerLink}>
              Ja
            </IonButton >
            <IonButton className={styles.button} onClick={() => props.dismiss(false)}>
              Nein
            </IonButton>
          </div>
        </div>
      </div >
    </IonModal >);
};

export default PlanFavoriteDialogueComponent;
