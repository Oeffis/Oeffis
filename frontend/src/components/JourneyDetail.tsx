import { IonIcon } from "@ionic/react";
import { format } from "date-fns";
import { trainOutline } from "ionicons/icons";
import { IJourney } from "../interfaces/IJourney.interface";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import FirstJourneyStepComponent from "./FirstJourneyStepComponent";
import styles from "./JourneyDetail.module.css";
import JourneyStepComponent from "./JourneyStepComponent";
import StepProgressComponent from "./StepProgressComponent";

export interface TravelProps { journey: IJourney; hideProgress?: boolean }

const formatDateShort = (date: Date): string => format(date, "HH:mm");

const JourneyDetail: React.FC<TravelProps> = (props: TravelProps) => (
  <div className={styles.journeyDetail}>
    <div className={styles.header}>
      <IonIcon className={styles.trainIcon} icon={trainOutline} />
      <div className={styles.headerDetails}>
        <p>
          <span>{formatDateShort(props.journey.startTime)} -</span>
          <span>{formatDateShort(props.journey.arrivalTime)}</span>
        </p>
        <p>
          <span>{props.journey.startStation} - </span>
          <span>{props.journey.arrivalStation}</span>
        </p>
      </div>
      <div className={styles.headerDuration}>
        <p className={styles.headerDurationAmount}>{props.journey.travelDurationInMinutes}</p>
        <p>Min</p>
      </div>
    </div>
    <StepDetails journey={props.journey} hideProgress={props.hideProgress} />
  </div>
);

export default JourneyDetail;

export interface StepDetailsProps { journey: IJourney, hideProgress?: boolean }
export function StepDetails(props: StepDetailsProps): JSX.Element {
  const showProgress = props.hideProgress ? false : true;
  return (
    <div className={styles.contentGrid}>
      {
        props.journey.stops.map((step: IJourneyStep, index) =>
          <>
            {
              index === 0
              && <FirstJourneyStepComponent
                showProgress={showProgress}
                key={"firstJourney" + index}
                startTime={step.startTime}
                stationName={step.stationName}
                isFirst={true}
                trackOrigin={step.trackOrigin}
                trackDestination={step.trackDestination} />}
            {
              index !== 0
              && <JourneyStepComponent
                showProgress={showProgress}
                key={"journeyStep" + index}
                step={step}
                arrivalTime={props.journey.stops[index - 1].arrivalTime} />}
            <StepProgressComponent
              showProgress={showProgress}
              key={"stepProgress" + index}
              step={step} />
            {index === props.journey.stops.length - 1
              && <FirstJourneyStepComponent
                key={"firstJourney" + index}
                stationName={props.journey.arrivalStation}
                startTime={props.journey.arrivalTime}
                isFirst={false}
                trackOrigin={step.trackOrigin}
                trackDestination={step.trackDestination} />}
          </>
        )}
    </div>
  );
}
