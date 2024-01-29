import { format, isFuture } from "date-fns";
import "./JourneyStepComponent.css";

const formatDateTime = (date: Date): string => format(date, "HH:mm");
export interface StationProps { stationName: string, time: Date, isFirst: boolean, trackOrigin: string, trackDestination: string}

const SimpleJourneyStepComponent: React.FC<StationProps> = (props: StationProps) => {
  const arrived = isFuture(props.time) ? false : true;

  return (
    <>
      <div className="centerBlock">
        {props.isFirst 
          ? "" 
          : <p className="m0">Ankunft</p>
          }
          <p className="m0">{formatDateTime(props.time)}</p>
      </div>
      
      <div className={arrived ? "arrived circle center" : " circle center"} />
      <p className="centerVertically bold">{props.stationName}</p>
      <p className="centerVertically textAlignCenter">Gl. 
        {props.isFirst
          ? props.trackOrigin
          : props.trackDestination
      }</p>
    </>
  );
};

export default SimpleJourneyStepComponent;
