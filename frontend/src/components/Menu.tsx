import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { clipboard, compass, settings, starHalf } from "ionicons/icons";
import React from "react";
import "./Menu.css";

const Menu: React.FC = () => (
  <IonMenu contentId="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonList>
        <IonMenuToggle autoHide={false}>
          <IonItem button routerLink={"/journey"} routerDirection="none">
            <IonIcon icon={compass} />
            <IonLabel>Journey</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button routerLink={"/favorites"} routerDirection="none">
            <IonIcon icon={starHalf} />
            <IonLabel>Favourites</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button routerLink={"/userHistory"} routerDirection="none">
            <IonIcon icon={clipboard} />
            <IonLabel>User History</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button routerLink={"/userPreferences"} routerDirection="none">
            <IonIcon icon={settings} />
            <IonLabel>User Preferences</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default Menu;
