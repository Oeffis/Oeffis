import { IonIcon, IonLabel } from "@ionic/react";
import { differenceInHours, differenceInMinutes, format } from "date-fns";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { useState } from "react";
import styles from "./LiveNavigationInfoComponent.module.css";
interface LiveNavigationInfoComponentProps {
  arrivalTime: Date;
}

const getHours = (arrivalTime: Date): string => {

  const hours = differenceInHours(arrivalTime, new Date());
  return hours.toString();
};
const getMinutes = (arrivalTime: Date): string => {
  // format returns duration + 1 hour thats why we subtract 60

  const hours = differenceInMinutes(arrivalTime, new Date()) % 60;
  return hours.toString();
};
const formatDateShort = (date: Date): string => format(date, "HH:mm");

export const LiveNavigationInfoComponent: React.FC<LiveNavigationInfoComponentProps> = (props) => {
  const [showInformation, setShowInformation] = useState(true);
  return (
    <>
      {showInformation && <NavigationInformation arrivalTime={props.arrivalTime} setShowInformation={setShowInformation} />}

      {!showInformation &&

        <div className={styles.content_small}>
          <IonIcon onClick={() => setShowInformation(true)} icon={chevronUpOutline} />
        </div>
      }
    </>
  );
};

export default LiveNavigationInfoComponent;

export function NavigationInformation(
  props: { arrivalTime: Date, setShowInformation: ((show: boolean) => void) }
): JSX.Element {
  return (
    <>
      <div className={styles.content}>

        <div className={styles.row}>
          <div className={styles.col}>
            <div>
              <IonLabel>
                Verbleibend
              </IonLabel>
            </div>
            <div>
              <IonLabel className={styles.time_number}>
                {getHours(props.arrivalTime)}
              </IonLabel>
              <IonLabel className={styles.time_text}>
                Std
              </IonLabel>
              <IonLabel className={styles.time_number}>
                {getMinutes(props.arrivalTime)}
              </IonLabel>
              <IonLabel className={styles.time_text}>
                Min
              </IonLabel>
            </div>
          </div>
          <div className={styles.col}>
            <IonLabel className={styles.time_text}>
              Ankunfszeit
            </IonLabel>
            <IonLabel className={styles.time_number}>
              {formatDateShort(props.arrivalTime)}
            </IonLabel>
          </div>
        </div>
        <IonIcon onClick={() => props.setShowInformation(false)} icon={chevronDownOutline} />
      </div>

    </>
  );
}
