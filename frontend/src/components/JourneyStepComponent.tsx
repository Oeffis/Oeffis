import { IonLabel } from "@ionic/react";
import { format } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./JourneyStepComponent.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { step?: IJourneyStep, arrivalDestination?: string, arrivalTime: Date, isFirst: boolean }

const JourneyStepComponent: React.FC<StationProps> = (props: StationProps) => {
  const checkIfArrived = (): boolean => {
    let traveledMinutes;

    if (props.step?.startTime) {
      const differenceInMs = new Date().getTime() - props.step.startTime.getTime();
      traveledMinutes = Math.round(((differenceInMs % 86400000) % 3600000) / 60000); // minutes

    } else {
      const differenceInMs = new Date().getTime() - props.arrivalTime.getTime();
      traveledMinutes = Math.round(((differenceInMs % 86400000) % 3600000) / 60000); // minutes    }
    }

    return traveledMinutes >= 0 ? true : false;
  };

  const color = checkIfArrived() ? "gray" : "lightgray";
  return (
    <div className="container" data-testid="journey-step">
      <div className="left">
        <IonLabel>
          {!props.isFirst && "Ankunft"}
        </IonLabel>
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
