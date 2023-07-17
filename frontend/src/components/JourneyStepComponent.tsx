import "./JourneyStepComponent.css";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";

export interface stationProps {step: IJourneyStep, first?: boolean, last?: boolean}

const JourneyStepComponent: React.FC<stationProps> = (props: stationProps) => (
    <div className="container">
        <div className="left">
            {props.step.arrivalTime}
        </div>
        <div className="timeline"/>
        <div className="step-info">
            {props.step.stopName} {props.step.stationName}
            {props.step.startTime}
        </div>
    </div>
  );
    
  
  export default JourneyStepComponent;
