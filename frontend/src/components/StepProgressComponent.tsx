import { IonLabel } from "@ionic/react";
import { format } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./StepProgressComponent.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");

export interface StepProgressProps { step: IJourneyStep }

let progress = 0;
const StepProgressComponent: React.FC<StepProgressProps> = (props: StepProgressProps) => {
  const calculateProgress = (): string => {
    const differenceInMs = new Date().getTime() - props.step.startTime.getTime();
    const traveledMinutes = Math.round(((differenceInMs % 86400000) % 3600000) / 60000); // minutes

    if (traveledMinutes > 0) {
      progress = (traveledMinutes / props.step.travelDurationInMinutes) * 100;
    }
    if (progress > 100) {
      progress = 100;
    }
    if (traveledMinutes <= 0) {
      progress = 0;
    }
    return progress.toString();
  };

  return (
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
          <div className="fill-line" style={{ height: calculateProgress() + "%" }} />
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
};

export default StepProgressComponent;
