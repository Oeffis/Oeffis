import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../components/Header";

const UserHistoryPage: React.FC = () => (
  <IonPage id="main-content">
    <Header />
    <IonContent fullscreen>
      <p>User History</p>
    </IonContent>
  </IonPage>
);

export default UserHistoryPage;
