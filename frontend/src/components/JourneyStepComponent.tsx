import { IonLabel } from "@ionic/react";
import { format } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./JourneyStepComponent.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { step: IJourneyStep, first?: boolean, last?: boolean }

const JourneyStepComponent: React.FC<StationProps> = (props: StationProps) => (

  <div className="container" data-testid="journey-step">
    <div className="left">
      <IonLabel>
        {formatDateTime(props.step.startTime)}
      </IonLabel>
    </div>
    <div className="middle">
      <div className="circle" />
    </div>
    <div className="step-info">
      <IonLabel>
        <span data-testid="journey-step-stop-name">
          {props.step.stationName}
        </span>
      </IonLabel>
    </div>
  </div>
);

export default JourneyStepComponent;
