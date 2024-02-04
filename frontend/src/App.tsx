import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import ResultRoutes from "./components/ResultRoutes/ResultRoutes";
import { CurrentLocationProvider } from "./hooks/useCurrentLocation";
import FavoritesPage from "./pages/FavoritesPage";
import JourneyPage from "./pages/JourneyPage";
import LiveNavigation from "./pages/LiveNavigation/LiveNavigation";
import StatsPage from "./pages/StatsPage";
import UserHistoryPage from "./pages/UserHistoryPage";
import UserPreferencesPage, { UserPreferences, UserPreferencesValues } from "./pages/UserPreferencesPage";
import { ApiClientsProvider } from "./services/apiClients/ApiClientsContext";
import { AppConfigProvider } from "./services/config/AppConfigContext";
import {
  FavoriteLocationsProvider,
  FavoriteRoutesProvider,
  FavoriteTripsProvider
} from "./services/favorites/FavoritesContext";
import { PersistenceProvider } from "./services/persistence/PersistenceContext";
import { PersistenceService } from "./services/persistence/PersistenceService";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {

  const persistance = new PersistenceService();
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState<boolean>();
  const [currnetJourneyUrl, setCurrentJourneyUrl] = useState<string>("/journey");

  useEffect(() => {
    persistance.get(UserPreferences.isDarkThemeEnabled) !== undefined
      ? persistance.get(UserPreferences.isDarkThemeEnabled) === UserPreferencesValues.enabled
        ? setIsDarkThemeEnabled(true)
        : setIsDarkThemeEnabled(false)
      : setIsDarkThemeEnabled(false);
    isDarkThemeEnabled
      ? document.body.setAttribute("color-theme", "dark")
      : document.body.removeAttribute("color-theme");
  }, [isDarkThemeEnabled]);

  return (
    <AppConfigProvider>
      <CurrentLocationProvider>
        <ApiClientsProvider>
          <PersistenceProvider>
            <FavoriteLocationsProvider>
              <FavoriteTripsProvider>
                <FavoriteRoutesProvider>
                  <IonApp>
                    <IonReactRouter>
                      <Menu currentJourneyUrl={currnetJourneyUrl} />
                      <Switch>
                        <Route exact path="/">
                          <Redirect to="/journey" />
                        </Route>
                        <Route exact path="/journey">
                          <JourneyPage
                            isDarkThemeEnabeld={isDarkThemeEnabled ?? false}
                            setCurrentJourneyUrl={setCurrentJourneyUrl}
                          />
                        </Route>
                        <Route exact path="/favorites">
                          <FavoritesPage />
                        </Route>
                        <Route exact path="/userHistory">
                          <UserHistoryPage />
                        </Route>
                        <Route exact path="/userPreferences">
                          <UserPreferencesPage
                            isDarkThemeEnabled={isDarkThemeEnabled ?? false}
                            setIsDarkThemeEnabled={setIsDarkThemeEnabled}
                          />
                        </Route>
                        <Route exact path="/results">
                          <ResultRoutes />
                        </Route>
                        <Route exact path="/liveNavigation">
                          <LiveNavigation />
                        </Route>
                        <Route exact path="/stats">
                          <StatsPage />
                        </Route>
                      </Switch >
                    </IonReactRouter >
                  </IonApp >
                </FavoriteRoutesProvider >
              </FavoriteTripsProvider >
            </FavoriteLocationsProvider >
          </PersistenceProvider >
        </ApiClientsProvider >
      </CurrentLocationProvider >
    </AppConfigProvider >
  );
};

export default App;
