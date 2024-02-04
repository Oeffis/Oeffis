import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { thunderstorm } from "ionicons/icons";
import { Header } from "../components/Header";

const NotFoundPage: React.FC = () => (
  <IonPage id="main-content">
    <Header />
    <IonContent fullscreen>
      <div className="error">
        <IonIcon className="errorIcon" src={thunderstorm} />
        <div>
          <p className="errorCode">404</p>
          <p className="errorMessage">Page not found</p>
        </div>
      </div>
    </IonContent>
  </IonPage>
);

export default NotFoundPage;
