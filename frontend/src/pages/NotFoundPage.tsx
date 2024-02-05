import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { thunderstorm } from "ionicons/icons";
import { Header } from "../components/Header";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => (
  <IonPage id="main-content">
    <Header title="Öffis" />
    <IonContent fullscreen>
      <div className={styles.error}>
        <IonIcon className={styles.errorIcon} src={thunderstorm} />
        <div>
          <p className={styles.errorCode}>404</p>
          <p className={styles.errorMessage}>Ups! Die Suche hat ein Verkehrsgewitter ausgelöst. Probiere es mal mit einer sonnigeren Anfrage.</p>
        </div>
      </div>
    </IonContent>
  </IonPage>
);

export default NotFoundPage;
