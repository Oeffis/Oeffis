import { IonCard, IonImg, IonLabel } from "@ionic/react";
import { format } from "date-fns";
import { IJourney } from "../interfaces/IJourney.interface";
import "./JourneyCard.css";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "dd.MM. HH:mm");

const JourneyCard: React.FC<TravelProps> = (props: TravelProps) => {
  return (
    <div className="JourneyCard">
      <IonCard className="detail-card">
        <div className="content-section">
          <div className="img-container">
            <IonImg src="./images/train_image.png" />
          </div>
          <div className="mid-section">
            <IonLabel>
              <span>{formatDateShort(props.journey.startTime)}</span>
              -
              <span>{formatDateShort(props.journey.arrivalTime)}</span>
            </IonLabel>
            <IonLabel>
              {props.journey.startStation} - {props.journey.arrivalStation}
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
      </IonCard>
    </div>
  );
};

export default JourneyCard;

export interface StepDetailsProps { journey: IJourney, }

