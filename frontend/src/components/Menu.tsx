import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Menu: React.FC = () => (
  <IonMenu contentId="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Settings</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">This is the menu content.</IonContent>
  </IonMenu>
);

export default Menu;
