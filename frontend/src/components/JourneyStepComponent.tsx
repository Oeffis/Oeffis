import "./JourneyStepComponent.css";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import { IonLabel } from "@ionic/react";

export interface StationProps { step: IJourneyStep, first?: boolean, last?: boolean }

const JourneyStepComponent: React.FC<StationProps> = (props: StationProps) => (
  <div className="container">
    <div className="left">
      {props.step.arrivalTime}
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
        Abfahrt: {props.step.startTime}
      </IonLabel>
      <IonLabel>
        Ankunft: {props.step.arrivalTime}
      </IonLabel>
    </div>
  </div>
);


export default JourneyStepComponent;
