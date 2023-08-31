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
import JourneyListComponent from "./components/JourneyListComponent";
import { IJourney } from "./interfaces/IJourney.interface";
import JourneysPage from "./pages/JourneysPage";
import UserPage from "./pages/UserPage";
import { AppConfigProvider } from "./services/config/AppConfigContext";
import { FavouriteStopsProvider, FavouriteTripsProvider } from "./services/favourites/FavouritesContext";
import { PersistenceProvider } from "./services/persistence/PersistenceContext";
import "./theme/variables.css";

setupIonicReact();

//Following Journeys are examples and only for visualization and testing purpose
const journey: IJourney = {
  startTime: "17:00",
  travelDuration: 90,
  arrivalTime: "19:30",
  startStation: "SE4",
  arrivalStation: "SE9",
  stops: [
    {
      stopName: "SE4",
      stationName: "Gladbeck HBF",
      track: "GL.3",
      startTime: "17:00",
      arrivalTime: "17:30",
      travelDuration: 30
    },
    {
      stopName: "RE14",
      stationName: "Endstation HBF",
      track: "GL.3",
      startTime: "17:40",
      arrivalTime: "18:20",
      travelDuration: 50
    },
    {
      stopName: "RE15",
      stationName: "Endstation HBF",
      track: "GL.3",
      startTime: "18:25",
      arrivalTime: "19:30",
      travelDuration: 65
    }
  ]
};

const journey2: IJourney = {
  startTime: "17:00",
  travelDuration: 90,
  arrivalTime: "19:50",
  startStation: "SE4",
  arrivalStation: "SE9",
  stops: [
    {
      stopName: "SE4",
      stationName: "Gladbeck HBF",
      track: "GL.3",
      startTime: "17:00",
      arrivalTime: "17:30",
      travelDuration: 30
    },
    {
      stopName: "RE15",
      stationName: "Endstation HBF",
      track: "GL.3",
      startTime: "18:25",
      arrivalTime: "19:50",
      travelDuration: 65
    }
  ]
};
const journeys = [journey, journey2, journey];


const App: React.FC = () => (
  <AppConfigProvider>
    <PersistenceProvider>
      <FavouriteStopsProvider>
        <FavouriteTripsProvider>
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
                <Route exact path="/journeyResults">
                  <JourneyListComponent journeys={journeys} />
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </IonApp>
        </FavouriteTripsProvider>
      </FavouriteStopsProvider>
    </PersistenceProvider>
  </AppConfigProvider >
);

export default App;
