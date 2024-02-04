import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { clipboard, compass, settings, starHalf, statsChart } from "ionicons/icons";
import React from "react";
import "./Menu.css";

export interface MenuProps {
  currentJourneyUrl: string
}

const Menu: React.FC<MenuProps> = (props) => (
  <IonMenu contentId="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonList>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={props.currentJourneyUrl} routerDirection="none">
            <IonIcon icon={compass} />
            <IonLabel>Journey</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={"/favorites"} routerDirection="none">
            <IonIcon icon={starHalf} />
            <IonLabel>Favorites</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={"/userHistory"} routerDirection="none">
            <IonIcon icon={clipboard} />
            <IonLabel>User History</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={"/userPreferences"} routerDirection="none">
            <IonIcon icon={settings} />
            <IonLabel>User Preferences</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={"/stats"} routerDirection="none">
            <IonIcon icon={statsChart} />
            <IonLabel>Stats</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default Menu;

export const cleanAllIntervals = (): void => {
  const intervalId = window.setInterval(() => { }, Number.MAX_SAFE_INTEGER);
  for (let i = 1; i < intervalId; i++) {
    window.clearInterval(i);
  }
};
