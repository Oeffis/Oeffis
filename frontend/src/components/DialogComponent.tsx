import { IonButton, IonButtons, IonContent, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import React from "react";
import styles from "./DialogComponent.module.css";

export interface DialogComponentProps {
  id: string,
  title: string,
  message: string,
  buttons: React.ReactElement[],
  isDialogueOpen: boolean,
  setIsDialogueOpen: (isOpen: boolean) => void,
  onDismiss?: () => void,
}

const DialogComponent: React.FC<DialogComponentProps> = (props) => (
  <IonModal
    className={styles.dialogue}
    id={props.id}
    isOpen={props.isDialogueOpen}
    onDidDismiss={() => {
      props.onDismiss && props.onDismiss();
      props.setIsDialogueOpen(false);
    }}>
    <IonContent>
      <IonToolbar className={styles.modal_toolbar}>
        <IonTitle>{props.title}</IonTitle>
        <IonButtons slot="end">
          <IonButton color="light" onClick={() => props.setIsDialogueOpen(false)}>
            <IonIcon icon={closeCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <div className={styles.modal_content_section} id="content_section">
        <div>
          {props.message}
        </div>
        <div className={styles.modal_buttons} id="buttons">
          {props.buttons.map((button, index) => <React.Fragment key={index}>{button}</React.Fragment>)}
        </div>
      </div>
    </IonContent>
  </IonModal>
);

export default DialogComponent;
