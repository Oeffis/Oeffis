import { IonCard, IonCol, IonImg, IonLabel, IonRow } from "@ionic/react";
import { format } from "date-fns";
import { IJourney } from "../interfaces/IJourney.interface";
import "./JourneyCard.css";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "HH:mm");

const JourneyCard: React.FC<TravelProps> = (props: TravelProps) => (
  <IonCard className="detail-card-sizing">
    <IonRow className="center_all_row_2">
      <IonCol>
        <IonImg className="train_icon" src="./images/train_image.png" />
      </IonCol>
      <IonCol className="mid-section">
        <IonLabel>
          <h2>
            {formatDateShort(props.journey.startTime)} - {formatDateShort(props.journey.arrivalTime)}
          </h2>
        </IonLabel>
        <IonLabel>
          {props.journey.startStation} - {props.journey.arrivalStation}
        </IonLabel>
      </IonCol>
      <IonCol className="duration">
        <IonLabel>
          <h1>{props.journey.travelDurationInMinutes}</h1>
        </IonLabel>
        <IonLabel>
          Min
        </IonLabel>
      </IonCol>
    </IonRow>
  </IonCard>
);

export default JourneyCard;

export interface StepDetailsProps { journey: IJourney, }

