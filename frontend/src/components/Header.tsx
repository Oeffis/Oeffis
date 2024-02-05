import { IonButtons, IonHeader, IonImg, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/OeffisLogo1.svg";
import styles from "./Header.module.css";

export const Header: React.FC = () => (
  <IonHeader>
    <IonToolbar className={styles.headerToolbar}>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>
        <h3>Öffis</h3>
      </IonTitle>
      <IonButtons slot="end">
        <IonImg className={styles.headerLogo} src={logo} />
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);
