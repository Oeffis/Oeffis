import { format, isFuture } from "date-fns";
import styles from "./FirstJourneyStepComponent.module.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { key: string, startTime: Date, stationName: string, isFirst: boolean, trackOrigin: string, trackDestination: string}

const FirstJourneyStepComponent: React.FC<StationProps> = (props: StationProps) => {
  const arrived = isFuture(props.startTime) ? false : true;

  return (
    <>
      <div className={styles.centerBlock}>
        {props.isFirst 
          ? "" 
          : <p className={styles.m0}>Ankunft</p>
          }
          <p className={styles.m0}>{formatDateTime(props.startTime)}</p>
      </div>
      <div className={arrived ? styles.circleArrived : styles.circleNotArrived} />
      <p className={styles.centerVertically + " " + styles.bold}>{props.stationName}</p>
      <p className={styles.centerVertically + " " + styles.textAlignCenter + " " + styles.track}> 
        {props.isFirst
          ? props.trackOrigin !== "" 
            ? "Gl. " +  props.trackOrigin
            : ""
          : props.trackDestination !== ""
            ? "Gl. " + props.trackDestination
            : ""
      }</p>
    </>
  );
};

export default FirstJourneyStepComponent;
