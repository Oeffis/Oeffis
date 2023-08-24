import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from "@ionic/react";
import { analytics, menu, person } from "ionicons/icons";
import RoutePlanner from "../components/RoutePlanner";
import "./Home.css";


const Home: React.FC = () => (
  <IonPage>
    <IonContent fullscreen>
      <RoutePlanner />
      <IonFab slot="fixed" vertical="top" horizontal="end">
        <IonFabButton color="primary">
          <IonIcon icon={menu} />
        </IonFabButton>
        <IonFabList side="bottom">
          <IonFabButton color="secondary" href="/userDemo">
            <IonIcon icon={person} />
          </IonFabButton>
          <IonFabButton color="secondary" href="/journeyDemo">
            <IonIcon icon={analytics} />
          </IonFabButton>
          <IonFabButton color="secondary" href="/journeyResults">
            Result Example
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  </IonPage>
);

export default Home;
