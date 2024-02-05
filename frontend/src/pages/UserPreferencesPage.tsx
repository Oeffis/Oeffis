import { IonButton, IonContent, IonLabel, IonPage, IonToggle } from "@ionic/react";
import { useEffect, useState } from "react";
import DialogComponent from "../components/DialogComponent";
import { Header } from "../components/Header";
import { PersistenceService } from "../services/persistence/PersistenceService";
import styles from "./UserPreferencesPage.module.css";

export enum UserPreferences {
  isDarkThemeEnabled = "isDarkThemeEnabeld"
}
export enum UserPreferencesValues {
  enabled = "enabled",
  disabled = "disabled",
}

export interface UserPreferencesPageProps {
  isDarkThemeEnabled: boolean,
  setIsDarkThemeEnabled: (value: boolean) => void
}

const UserPreferencesPage: React.FC<UserPreferencesPageProps> = (props) => {

  const persistance = new PersistenceService();
  const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);

  const setIsDarkThemeEnabledPersistence = (): void => {
    props.setIsDarkThemeEnabled(!props.isDarkThemeEnabled);
    persistance.set(
      UserPreferences.isDarkThemeEnabled,
      props.isDarkThemeEnabled
        ? UserPreferencesValues.disabled
        : UserPreferencesValues.enabled
    );
  };

  const openClearHistoryDialog = (): void => {
    setIsDialogueOpen(true);
    console.log("Open clear history dialog");
  };

  const clearHistory = (): void => {
    console.log("Clearing user history");
  };

  useEffect(() => {
    persistance.get(UserPreferences.isDarkThemeEnabled) !== undefined
      ? persistance.get(UserPreferences.isDarkThemeEnabled) === UserPreferencesValues.enabled
        ? props.setIsDarkThemeEnabled(true)
        : props.setIsDarkThemeEnabled(false)
      : props.setIsDarkThemeEnabled(false);
    props.isDarkThemeEnabled
      ? document.body.setAttribute("color-theme", "dark")
      : document.body.removeAttribute("color-theme");
  }, [props.isDarkThemeEnabled]);

  return (
    <IonPage id="main-content">
      <Header />
      <IonContent fullscreen>
        <div className={styles.userPreferences}>
          <div className={styles.row}>
            <div className={styles.key}>
              <IonLabel>Dunkelmodus</IonLabel>
            </div>
            <div className={styles.value}>
              <IonToggle checked={props.isDarkThemeEnabled} disabled={false} onClick={() => setIsDarkThemeEnabledPersistence()} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.key}>
              <IonLabel>Historie</IonLabel>
            </div>
            <div className={styles.value}>
              <IonButton onClick={() => openClearHistoryDialog()}>Löschen</IonButton>
            </div>
          </div>
        </div>
      </IonContent>
      <DialogComponent
        id="dialog_clear_user_history"
        title="Historie löschen"
        message="Alle Einträge in der Historie löschen?"
        buttons={[
          <IonButton onClick={() => {
            setIsDialogueOpen(false);
            clearHistory();
          }}> Ja</IonButton>,
          <IonButton onClick={() => setIsDialogueOpen(false)}>Nein</IonButton>
        ]}
        isDialogueOpen={isDialogueOpen}
        setIsDialogueOpen={setIsDialogueOpen}
      />
    </IonPage >

  );
};

export default UserPreferencesPage;
