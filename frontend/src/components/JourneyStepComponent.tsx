import { format, isFuture } from "date-fns";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./JourneyStepComponent.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { step?: IJourneyStep, arrivalDestination?: string, arrivalTime: Date }

const JourneyStepComponent: React.FC<StationProps> = (props: StationProps) => {
  const arrived = isFuture(props.arrivalTime) ? false : true;

  return (
    <>
    <div className="centerBlock">
      <p className="m0">Ankunft</p>
      <p className="m0">{formatDateTime(props.arrivalTime)}</p>
    </div>
    <div className={arrived? "arrived circle center" : " circle center"}/>
    <div>
      <p className="centerVertically m0 bold">
        {
          props.step
            ? props.step.stationName
            : props.arrivalDestination
        }
      </p>
      <p className="m0">Umstiegszeit</p>
      <p className="m0">Fußweg</p>
    </div>
    <p className="centerVertically">Gl. 00</p>
    </>
  );
};

export default JourneyStepComponent;
