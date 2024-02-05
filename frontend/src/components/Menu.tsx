import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { clipboard, compass, settings, starHalf, statsChart } from "ionicons/icons";
import React from "react";

export interface MenuProps {
  currentJourneyUrl: string
}

const Menu: React.FC<MenuProps> = (props) => (
  <IonMenu contentId="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menü</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonList>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={props.currentJourneyUrl} routerDirection="none">
            <IonIcon icon={compass} />
            <IonLabel>Routenplaner</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={"/favorites"} routerDirection="none">
            <IonIcon icon={starHalf} />
            <IonLabel>Favoriten</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={"/userHistory"} routerDirection="none">
            <IonIcon icon={clipboard} />
            <IonLabel>Historie</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={"/userPreferences"} routerDirection="none">
            <IonIcon icon={settings} />
            <IonLabel>Einstellungen</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem button onClick={() => cleanAllIntervals()} routerLink={"/stats"} routerDirection="none">
            <IonIcon icon={statsChart} />
            <IonLabel>Statistiken</IonLabel>
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
