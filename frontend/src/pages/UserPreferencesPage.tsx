import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/OeffisLogo1.svg";

const UserPreferencesPage: React.FC = () => (
  <IonPage id="main-content">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <div className="menuBar">
          <IonTitle>Öffis</IonTitle>
          <IonImg className="menuLogo" src={logo} />
        </div>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <p>User Preferences</p>
    </IonContent>
  </IonPage>
);

export default UserPreferencesPage;
