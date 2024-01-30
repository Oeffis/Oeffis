import { IonButtons, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/OeffisLogo1.svg";

const StatsPage: React.FC = () => {
  return (<IonPage id="main-content">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          <h3>Stats</h3>
        </IonTitle>
        <IonButtons slot="end">
          <IonImg className="menuLogo" src={logo} />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  </IonPage>);
};

export default StatsPage;
