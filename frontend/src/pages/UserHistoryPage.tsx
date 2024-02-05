import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import HistoryEntryComponent, { HistoryEntryComponentProps } from "../components/history/HistoryEntryComponent";
import { PersistenceService } from "../services/persistence/PersistenceService";
import styles from "./UserHistoryPage.module.css";

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
  const [historyEntries, setHistoryEntries] = useState<HistoryEntryComponentProps[]>(
    [
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: false,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: false,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      },
      {
        date: new Date("2024-02-05T13:10:00"),
        asArrival: true,
        originId: "de:05513:4494",
        originName: "Gelsenkirchen, Am stadtwald",
        destinationId: "de:05513:5124",
        destinationName: "Gelsenkirchen, Neidenburg"
      }
    ]
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
