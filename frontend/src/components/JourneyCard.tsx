import { IonCard, IonImg, IonLabel } from "@ionic/react";
import { format } from "date-fns";
import { IJourney } from "../interfaces/IJourney.interface";
import styles from "./JourneyCard.module.css";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "HH:mm");

const JourneyCard: React.FC<TravelProps> = (props: TravelProps) => (
  <IonCard className={styles.detailCard}>
    <div className={styles.contentSection}>
      <div>
        <IonImg src="./images/train_image.png" />
      </div>
      <div className={styles.midSection}>
        <IonLabel>
          <span>{formatDateShort(props.journey.startTime)}</span>
          -
          <span>{formatDateShort(props.journey.arrivalTime)}</span>
        </IonLabel>
        <IonLabel>
          {props.journey.startStation} - {props.journey.arrivalStation}
        </IonLabel>
      </div>
      <div>
        <IonLabel>
          {props.journey.travelDurationInMinutes}
        </IonLabel>
        <IonLabel>
          Min
        </IonLabel>
      </div>
    </div>
  </IonCard>
);

export default JourneyCard;

export interface StepDetailsProps { journey: IJourney, }

