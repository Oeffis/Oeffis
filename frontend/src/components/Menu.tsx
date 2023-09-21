import { IonButton, IonContent, IonHeader, IonItem, IonList, IonMenu, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Menu: React.FC = () => (
  <IonMenu contentId="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonList>
        <IonItem>
          <IonButton type="submit" size="default" expand="block">Favorites</IonButton>
        </IonItem>
        <IonItem>
          <IonButton type="submit" size="default" expand="block">User History</IonButton>
        </IonItem>
        <IonItem>
          <IonButton type="submit" size="default" expand="block">User Preferences</IonButton>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default Menu;
