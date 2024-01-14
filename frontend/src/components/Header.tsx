import { IonButtons, IonHeader, IonImg, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/train_image.png";

export const Header: React.FC = () => (
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>
        <h3>Öffis</h3>
      </IonTitle>
      <IonButtons slot="end">
        <IonImg className="menuLogo" src={logo} />
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);
