import { IonButtons, IonHeader, IonImg, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/OeffisLogo1.svg";
import styles from "./Header.module.css";

export interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = (props) => (
  <IonHeader>
    <IonToolbar className={styles.headerToolbar}>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>
        <h3>{props.title}</h3>
      </IonTitle>
      <IonButtons slot="end">
        <IonImg className={styles.headerLogo} src={logo} />
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);
