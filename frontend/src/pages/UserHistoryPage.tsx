import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import HistoryEntryComponent, { HistoryEntryComponentProps } from "../components/history/HistoryEntryComponent";
import { PersistenceService } from "../services/persistence/PersistenceService";
import styles from "./UserHistoryPage.module.css";
import { UserPreferences } from "./UserPreferencesPage";

export interface PersistanceHistoryEntry {
  date: string,
  asArrival: string,
  originId: string,
  originName: string,
  destinationId: string,
  destinationName: string,
}

const UserHistoryPage: React.FC = () => {

  const persistenceService = new PersistenceService();
  const [historyEntries, setHistoryEntries] = useState<HistoryEntryComponentProps[]>([]);
  const [historyEntriesPersistence] = useState<PersistanceHistoryEntry[]>(
    JSON.parse(persistenceService.get(UserPreferences.userHistory) ?? "[]") as PersistanceHistoryEntry[]
  );

  const loadHistoryEntry = (persistenceHistoryEntry: PersistanceHistoryEntry): HistoryEntryComponentProps => ({
    date: new Date(persistenceHistoryEntry.date),
    asArrival: persistenceHistoryEntry.asArrival === "true",
    originId: persistenceHistoryEntry.originId,
    originName: persistenceHistoryEntry.originName,
    destinationId: persistenceHistoryEntry.destinationId,
    destinationName: persistenceHistoryEntry.destinationName
  });

  useEffect(() => {
    setHistoryEntries(historyEntriesPersistence.map(entry => loadHistoryEntry(entry)));
  }, []);

  return (
    <IonPage id="main-content">
      <Header />
      <IonContent fullscreen>
        <div className={styles.userHistory}>
          {
            historyEntries.length === 0
              ? <p className={styles.noEntries}>Keine Einträge vorhanden</p>
              : historyEntries.map((entry, index) => (
                <HistoryEntryComponent
                  key={index}
                  date={entry.date}
                  asArrival={entry.asArrival}
                  originId={entry.originId}
                  originName={entry.originName}
                  destinationId={entry.destinationId}
                  destinationName={entry.destinationName}
                />
              ))
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserHistoryPage;

export const saveJourneyToUserHistory = (newUserHistoryEntry: PersistanceHistoryEntry): void => {
  const persistenceService = new PersistenceService();
  const userHistory = JSON.parse(persistenceService.get(UserPreferences.userHistory) ?? "[]");
  if (userHistory.length === 20) {
    //userHistory.push(newUserHistoryEntry);
  } else {
    userHistory.push(newUserHistoryEntry);
  }
  persistenceService.set(UserPreferences.userHistory, JSON.stringify(userHistory));
};
