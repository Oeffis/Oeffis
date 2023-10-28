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
        <span>
          {props.step.stopName}
        </span>
      </IonLabel>
      <IonLabel>
        Abfahrt:
        <span>
          {formatDateShort(props.step.startTime)}
        </span>
      </IonLabel>
      <IonLabel>
        <span>
          {formatDateShort(props.step.arrivalTime)}
        </span>
      </IonLabel>
    </div>
  </div>
);

export default JourneyStepComponent;
