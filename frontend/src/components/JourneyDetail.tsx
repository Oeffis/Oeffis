import { IonCard, IonImg, IonLabel } from "@ionic/react";
import { format } from "date-fns";
import { IJourney } from "../interfaces/IJourney.interface";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import FirstJourneyStepComponent from "./FirstJourneyStepComponent";
import "./JourneyDetail.css";
import JourneyStepComponent from "./JourneyStepComponent";
import StepProgressComponent from "./StepProgressComponent";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "HH:mm");

const JourneyDetail: React.FC<TravelProps> = (props: TravelProps) => (
  <div className="JourneyDetail">
    <IonCard className="detail-card">
      <div className="content-section">
        <div className="img-container">
          <IonImg src="./images/train_image.png" />
        </div>
        <div className="mid-section">
          <div className="time-section">
            <IonLabel>
              <span>{formatDateShort(props.journey.startTime)} Uhr</span>
            </IonLabel>
            -
            <IonLabel>
              <span>{formatDateShort(props.journey.arrivalTime)} Uhr</span>
            </IonLabel>
          </div>

          <IonLabel>
            {props.journey.startStation}
          </IonLabel>
          <IonLabel>
            {props.journey.arrivalStation}
          </IonLabel>
        </div>
        <div className="duration">
          <IonLabel>
            {props.journey.travelDurationInMinutes}
          </IonLabel>
          <IonLabel>
            Min
          </IonLabel>
        </div>
      </div>
      <StepDetails journey={props.journey} />
    </IonCard>
  </div>
);

export default JourneyDetail;

export interface StepDetailsProps { journey: IJourney, }
export function StepDetails(props: StepDetailsProps): JSX.Element {

  return (
    <div className="bottom-section-opened">
      <div className="steps">
        {
          props.journey.stops.map((step: IJourneyStep, index) =>
            <>
              {index === 0 && <FirstJourneyStepComponent startTime={step.startTime} stationName={step.stationName} />}
              {
                index !== 0 && <JourneyStepComponent
                  key={"journeyStep" + index}
                  step={step}
                  arrivalTime={props.journey.stops[index - 1].arrivalTime} />
              }
              <StepProgressComponent key={"stepProgress" + index} step={step} />
            </>
          )
        }
        <div className="steps">
          {
            <JourneyStepComponent arrivalDestination={props.journey.arrivalStation} arrivalTime={props.journey.arrivalTime} />
          }
        </div>
      </div>
    </div>);
}
