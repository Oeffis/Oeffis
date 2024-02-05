import { IonContent, IonPage } from "@ionic/react";
import { ReactElement, useEffect, useState } from "react";
import { Header } from "../components/Header";
import styles from "./UserHistoryPage.module.css";

const UserHistoryPage: React.FC = () => {

  const [historyEntries, setHistoryEntries] = useState<ReactElement[]>([]);

  const loadHistoryEntry = () => {

  }

  useEffect(() => {
    // read persistence
  }, []);

  return (
    <IonPage id="main-content">
      <Header />
      <IonContent fullscreen>
        <div className={styles.userHistory}>
          {
            historyEntries.length === 0
              ? <p>Keine Einträge vorhanden</p>
              : historyEntries
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserHistoryPage;
