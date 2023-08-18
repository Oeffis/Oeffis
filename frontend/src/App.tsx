import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import { AppConfigProvider } from "./services/config/AppConfigContext";
import JourneysPage from "./pages/JourneysPage";
import UserPage from "./pages/UserPage";
import "./theme/variables.css";
import { PersistenceProvider } from "./services/persistence/PersistenceContext";

setupIonicReact();

const App: React.FC = () => (
  <AppConfigProvider>
    <PersistenceProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/userDemo">
              <UserPage />
            </Route>
            <Route exact path="/journeyDemo">
              <JourneysPage />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </PersistenceProvider>
  </AppConfigProvider>
);

export default App;
