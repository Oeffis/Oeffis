import { IonContent, IonPage } from "@ionic/react";
import RoutePlanner from "../components/RoutePlanner";
import "./Home.css";


const Home: React.FC = () => (
  <IonPage>
    <IonContent fullscreen>
      <RoutePlanner />
    </IonContent>
  </IonPage>
);

export default Home;
