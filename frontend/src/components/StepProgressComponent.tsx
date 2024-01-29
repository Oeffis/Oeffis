import { IonLabel } from "@ionic/react";
import { format, differenceInMilliseconds, minutesToMilliseconds } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./StepProgressComponent.css";
import { DisplayDelayStats } from "./DisplayDelayStats";

export interface StepProgressProps { step: IJourneyStep }

const formatDateTime = (date: Date): string => format(date, "HH:mm");

const StepProgressComponent: React.FC<StepProgressProps> = (props: StepProgressProps) => 
  
  (
  <>
    <div className="centerBlock">
      <p className="m0">Abfahrt</p>
      <p className="m0">{formatDateTime(props.step.startTime)}</p>
    </div>
    <div className="line centerBlock">
      <FillLine startTime={props.step.startTime} travelDurationInMinutes={props.step.travelDurationInMinutes} />
    </div>
    <div className="centerVertically">
      <p className="m0 bold">{props.step.line}</p>
      <p className="m0">
        {props.step.line && "Fahrtzeit: "}
        {!props.step.line && "Fußweg: "}
        {props.step.travelDurationInMinutes} Min
      </p>
      <DisplayDelayStats stats={props.step.stats} originName={props.step.stationName} destinationName={props.step.stopName} />
    </div>
    <IonLabel/>
  </>
);

export default StepProgressComponent;

export interface FillLineProps { startTime: Date, travelDurationInMinutes: number; }

export function FillLine(props: FillLineProps): JSX.Element {

  const traveledTimeInMs = differenceInMilliseconds(new Date().getTime(), props.startTime.getTime());
  const travelDurationInMs = minutesToMilliseconds(props.travelDurationInMinutes);

  let progress = traveledTimeInMs <= 0 ? 0 : (traveledTimeInMs / travelDurationInMs) * 100;

  if (progress > 100) {
    progress = 100;
  }

  return (
    <div className="fill-line" style={{ height: progress.toString() + "%" }} />
  );
}
