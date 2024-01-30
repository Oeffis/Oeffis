import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/OeffisLogo1.svg";
import { useStats } from "../hooks/useStats";

const StatsPage: React.FC = () => {
  const stats = useStats();

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
    <IonContent>
      {JSON.stringify(stats)}
    </IonContent>
  </IonPage>);
};

export default StatsPage;
