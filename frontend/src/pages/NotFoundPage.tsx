import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../components/Header";

const NotFoundPage: React.FC = () => (
  <IonPage id="main-content">
    <Header />
    <IonContent fullscreen>
      <div className="error">
        <p>error</p>
      </div>
    </IonContent>
  </IonPage>
);

export default NotFoundPage;
