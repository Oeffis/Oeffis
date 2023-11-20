import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../../public/images/train_image.png";
import JourneyListComponent from "../JourneyListComponent";
import "./ResultRoutes.css";

// export interface ResultRoutesProps { journeys: IJourney[] }


const ResultRoutes: React.FC = () => {

  return (
    <>
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
      <IonContent>
        <JourneyListComponent journeys={resultRoutes} />
      </IonContent>
    </>

  );
};


export default ResultRoutes;
