import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
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
      <ExploreContainer />
      <UserContainer />
    </IonContent>
  </IonPage>
);

export default Home;
