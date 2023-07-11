import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import JourneysContainer from "../components/JourneysContainer";
import RouteOptionDetail from "../components/RouteOptionDetail";
import UserContainer from "../components/UserContainer";
import "./Home.css";


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
      <RouteOptionDetail startTime="16:32" arrivalTime="17:32" startingStation="RE14" arrivalStation="S9" travelDuration={55} stops={["1", "2"]}/>
    </IonContent>
  </IonPage>
);

export default Home;
