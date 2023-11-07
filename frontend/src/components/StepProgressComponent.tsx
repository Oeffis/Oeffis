import { IonLabel } from "@ionic/react";
import { differenceInMilliseconds, format, minutesToMilliseconds } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./StepProgressComponent.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");

export interface StepProgressProps { step: IJourneyStep }

const StepProgressComponent: React.FC<StepProgressProps> = (props: StepProgressProps) => (
  <div className="container" data-testid="journey-step" >
    <div className="left">
      <IonLabel>
        Abfahrt
      </IonLabel>
      <IonLabel>
        {formatDateTime(props.step.startTime)}
      </IonLabel>
    </div>
    <div className="middle">
      <div className="line">
        <FillLine startTime={props.step.startTime} travelDurationInMinutes={props.step.travelDurationInMinutes} />
      </div>
    </div>
    <div className="line-info">
      <IonLabel>
        Linie: {props.step.line}
      </IonLabel>
      <IonLabel>
        Fahrtzeit: {props.step.travelDurationInMinutes} Min
      </IonLabel>
    </div>
  </div >
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