import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/train_image.png";
import "./UserHistoryPage.css";


const UserHistoryPage: React.FC = () => (
  <IonPage id="main-content">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <div className="menuBar">
          <IonTitle>Oeffies</IonTitle>
          <IonImg className="menuLogo" src={logo} />
        </div>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <p>User History</p>
    </IonContent>
  </IonPage>
);

export default UserHistoryPage;
