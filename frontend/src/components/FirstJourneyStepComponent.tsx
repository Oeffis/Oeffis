import { format, isFuture } from "date-fns";
import styles from "./FirstJourneyStepComponent.module.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { stationName: string, time: Date, isFirst: boolean, trackOrigin: string, trackDestination: string}

const FirstJourneyStepComponent: React.FC<StationProps> = (props: StationProps) => {
  const arrived = isFuture(props.time) ? false : true;

  return (
    <>
      <div className={styles.centerBlock}>
        {props.isFirst 
          ? "" 
          : <p className={styles.m0}>Ankunft</p>
          }
          <p className={styles.m0}>{formatDateTime(props.time)}</p>
      </div>
      <div className={arrived ? styles.circleArrived : styles.circleNotArrived} />
      <p className={styles.centerVertically + " " + styles.bold}>{props.stationName}</p>
      <p className={styles.centerVertically + " " + styles.textAlignCenter}>Gl. 
        {props.isFirst
          ? props.trackOrigin
          : props.trackDestination
      }</p>
    </>
  );
};

export default FirstJourneyStepComponent;
