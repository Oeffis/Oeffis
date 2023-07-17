import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import JourneysContainer from "../components/JourneysContainer";
import RouteOptionDetail from "../components/RouteOptionDetail";
import UserContainer from "../components/UserContainer";
import "./Home.css";
import { IJourney } from "../interfaces/IJourney.interface";


const journey : IJourney = {
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

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Blank</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ExploreContainer/>
      <UserContainer/>
      <JourneysContainer/>
      <RouteOptionDetail journey={journey} />
    </IonContent>
  </IonPage>
);

export default Home;
