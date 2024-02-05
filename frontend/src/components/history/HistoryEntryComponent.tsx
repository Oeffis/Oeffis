import { IonIcon } from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import styles from "./HistoryEntryComponent.module.css";

export interface HistoryEntryComponentProps {
  date: Date,
  asArrival: boolean,
  originId: string,
  originName: string,
  destinationId: string,
  destinationName: string,
}

const HistoryEntryComponent: React.FC<HistoryEntryComponentProps> = (props) => {

  const historyEntryClicked = (): void => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `${protocol}//${hostname}:${port}/journey?origin=${props.originId}&destination=${props.destinationId}`;
  };

  return (
    <div className={styles.historyEntry} onClick={() => historyEntryClicked()}>
      <div className={styles.rowTop}>
        <div className={`${styles.cell}`}>
          <p className={props.asArrival ? styles.date : styles.time}>{props.asArrival ? props.date.toLocaleDateString() : props.date.getHours() + ":" + props.date.getMinutes() + " Uhr"}</p>
        </div>
        <div className={`${styles.middleCell}`} />
        <div className={`${styles.cell}`}>
          <p className={props.asArrival ? styles.time : styles.date}>{props.asArrival ? props.date.getHours() + ":" + props.date.getMinutes() + " Uhr" : props.date.toLocaleDateString()}</p>
        </div>
      </div>
      <div className={styles.rowBottom}>
        <div className={`${styles.cell}`}>
          <p>{props.originName.split(",")[0]}</p>
          <p>{props.originName.split(",")[1]}</p>
        </div>
        <div className={`${styles.middleCell}`}>
          <IonIcon className={styles.arrowIcon} icon={arrowForwardOutline} />
        </div>
        <div className={`${styles.cell}`}>
          <p>{props.destinationName.split(",")[0]}</p>
          <p>{props.destinationName.split(",")[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryEntryComponent;
