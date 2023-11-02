import { IonLabel } from "@ionic/react";
import { format, isFuture } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./JourneyStepComponent.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { step?: IJourneyStep, arrivalDestination?: string, arrivalTime: Date }

const JourneyStepComponent: React.FC<StationProps> = (props: StationProps) => {
  const color = isFuture(props.arrivalTime) ? "lightgray" : "gray";

  return (
    <div className="container" data-testid="journey-step">
      <div className="left">
        <IonLabel>
          {formatDateTime(props.arrivalTime)}
        </IonLabel>
      </div>
      <div className="middle">
        <div className="circle" style={{ background: color }} />
      </div>
      <div className="step-info">
        <IonLabel>
          <span data-testid="journey-step-stop-name">
            {
              props.step
                ? props.step.stationName
                : props.arrivalDestination
            }
          </span>
        </IonLabel>
      </div>
    </div>
  );
};

export default JourneyStepComponent;
