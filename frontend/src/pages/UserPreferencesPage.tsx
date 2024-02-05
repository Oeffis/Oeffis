import { IonContent, IonLabel, IonPage, IonToggle } from "@ionic/react";
import { useEffect } from "react";
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

  const setIsDarkThemeEnabledPersistence = (): void => {
    props.setIsDarkThemeEnabled(!props.isDarkThemeEnabled);
    persistance.set(
      UserPreferences.isDarkThemeEnabled,
      props.isDarkThemeEnabled
        ? UserPreferencesValues.disabled
        : UserPreferencesValues.enabled
    );
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
        </div>
      </IonContent>
    </IonPage>

  );
};

export default UserPreferencesPage;
