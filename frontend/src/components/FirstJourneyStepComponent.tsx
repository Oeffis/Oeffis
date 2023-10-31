import { IonLabel } from "@ionic/react";
import { format, isFuture } from "date-fns";
import "./JourneyStepComponent.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { stationName: string, startTime: Date }

const FirstJourneyStepComponent: React.FC<StationProps> = (props: StationProps) => {
  const color = !isFuture(props.startTime) ? "gray" : "lightgray";

  return (
    <div className="container" data-testid="journey-step">
      <div className="left">
        <IonLabel>
          Ankunft
        </IonLabel>
        <IonLabel>
          {formatDateTime(props.startTime)}
        </IonLabel>
      </div>
      <div className="middle">
        <div className="circle" style={{ background: color }} />
      </div>
      <div className="step-info">
        <IonLabel>
          <span data-testid="journey-step-stop-name">
            {
              props.stationName
            }
          </span>
        </IonLabel>
      </div>
    </div>
  );
};

export default FirstJourneyStepComponent;
