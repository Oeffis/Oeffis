import { IonImg } from "@ionic/react";
import { format } from "date-fns";
import { IJourney } from "../interfaces/IJourney.interface";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import "./JourneyDetail.css";
import JourneyStepComponent from "./JourneyStepComponent";
import FirstJourneyStepComponent from "./FirstJourneyStepComponent";
import StepProgressComponent from "./StepProgressComponent";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "HH:mm");

const JourneyDetail: React.FC<TravelProps> = (props: TravelProps) => (
  <div className="journeyDetail">
    <div className="header">
      <IonImg className="headerImg" src="./images/train_image.png" />
      <div className="headerDetails">
        <p>
          <span>{formatDateShort(props.journey.startTime)} -</span>
          <span>{formatDateShort(props.journey.arrivalTime)}</span>
        </p>
        <p>
          <span>{props.journey.startStation} - </span>
          <span>{props.journey.arrivalStation}</span>
        </p>
      </div>
      <div className="headerDuration">
        <p className="headerDurationAmount">{props.journey.travelDurationInMinutes}</p>
        <p>Min</p>
      </div>
    </div>
    <StepDetails journey={props.journey} />
  </div>
);

export default JourneyDetail;

export interface StepDetailsProps { journey: IJourney, }
export function StepDetails(props: StepDetailsProps): JSX.Element {

  return (
    <div className="contentGrid">
      {
        props.journey.stops.map((step: IJourneyStep, index) =>
          <>
            {index === 0 && <FirstJourneyStepComponent time={step.startTime} stationName={step.stationName} isFirst={true} trackOrigin={step.trackOrigin} trackDestination={step.trackDestination}/>}
            {
              index !== 0 &&
              <JourneyStepComponent
                key={"journeyStep" + index}
                step={step}
                arrivalTime={props.journey.stops[index - 1].arrivalTime} />
            }
            <StepProgressComponent key={"stepProgress" + index} step={step} />
            {index === props.journey.stops.length - 1 && <FirstJourneyStepComponent stationName={props.journey.arrivalStation} time={props.journey.arrivalTime} isFirst={false} trackOrigin={step.trackOrigin} trackDestination={step.trackDestination}/>}
          </>
        )}
      
    </div>
  );
}
