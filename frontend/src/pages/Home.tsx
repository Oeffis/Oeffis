import { IonContent, IonPage } from "@ionic/react";
import LeafletMapContainer from "../components/LeafletMapContainer";
import "./Home.css";

const Home: React.FC = () => (
  <IonPage>
    <IonContent fullscreen>
      <LeafletMapContainer />
    </IonContent>
  </IonPage>
);

export default Home;
