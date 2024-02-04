import { format, isFuture } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import styles from "./JourneyStepComponent.module.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { step?: IJourneyStep, arrivalDestination?: string, arrivalTime: Date; showProgress?: boolean; }

const JourneyStepComponent: React.FC<StationProps> = (props: StationProps) => {
  const arrived = isFuture(props.arrivalTime) ? false : true;

  return (
    <>
      <div className={styles.centerBlock}>
        <p className={styles.m0}>Ankunft</p>
        <p className={styles.m0}>{formatDateTime(props.arrivalTime)}</p>
      </div>
      <div className={arrived && props.showProgress ? styles.circleArrived : styles.circleNotArrived} />
      <p className={styles.centerVertically + " " + styles.bold + " " + styles.paddingLeft}>
        {
          props.step
            ? props.step.stationName
            : props.arrivalDestination
        }
      </p>
      <p className={styles.centerVertically + " " + styles.textAlignCenter + " " + styles.track}>
        {props.step?.trackOrigin !== ""
          ? "Gl. " + props.step?.trackOrigin
          : ""
        }</p>
    </>
  );
};

export default JourneyStepComponent;
