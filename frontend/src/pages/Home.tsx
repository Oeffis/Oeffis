import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from "@ionic/react";
import { menu, person } from "ionicons/icons";
import LeafletMapContainer from "../components/LeafletMapContainer";
import "./Home.css";

const Home: React.FC = () => (
  <IonPage>
    <IonContent fullscreen>
      <LeafletMapContainer />
      <IonFab slot="fixed" vertical="top" horizontal="end">
        <IonFabButton color="primary">
          <IonIcon icon={menu} />
        </IonFabButton>
        <IonFabList side="bottom">
          <IonFabButton color="secondary" href="/userDemo">
            <IonIcon icon={person} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  </IonPage>
);

export default Home;
