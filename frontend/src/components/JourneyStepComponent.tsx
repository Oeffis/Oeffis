import { IonLabel } from "@ionic/react";
import { format } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./JourneyStepComponent.css";

const formatDateShort = (date: Date): string => format(date, "dd.MM. HH:mm");

export interface StationProps { step: IJourneyStep, first?: boolean, last?: boolean }

const JourneyStepComponent: React.FC<StationProps> = (props: StationProps) => (
  <div className="container">
    <div className="left">
      {formatDateShort(props.step.arrivalTime)}
      <div className="timeline-container">
        <div className="circle" />
        <div className="line" />
      </div>
    </div>
    <div className="step-info">
      <IonLabel>
        {props.step.stopName} "{props.step.stationName}"
      </IonLabel>
      <IonLabel>
        Abfahrt: {formatDateShort(props.step.startTime)}
      </IonLabel>
      <IonLabel>
        Ankunft: {formatDateShort(props.step.arrivalTime)}
      </IonLabel>
    </div>
  </div>
);

export default JourneyStepComponent;
