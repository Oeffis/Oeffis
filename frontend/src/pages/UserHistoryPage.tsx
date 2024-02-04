import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";

const UserHistoryPage: React.FC = () => {

  const [historyEntries, setHistoryEntries] = useState<string[]>([]);

  useEffect(() => {
    // read persistence
  }, []);

  return (
    <IonPage id="main-content">
      <Header />
      <IonContent fullscreen>
        <div className="userHistory">
          {
            historyEntries.length === 0
              ? <p>No entries</p>
              : historyEntries
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserHistoryPage;
