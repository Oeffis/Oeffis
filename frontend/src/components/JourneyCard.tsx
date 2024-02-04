import { IonCard, IonCol, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { format } from "date-fns";
import { trainOutline } from "ionicons/icons";
import { IJourney } from "../interfaces/IJourney.interface";
import styles from "./JourneyCard.module.css";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "HH:mm");

const timeSplitter = (traveltime: number): number[] => {
  const traveltimeRounded = Math.round(traveltime);
  const traveltimeHours = Math.floor(traveltimeRounded / 60);
  const traveltimeMinutes = traveltimeRounded % 60;
  return [traveltimeHours, traveltimeMinutes];
};

const JourneyCard: React.FC<TravelProps> = (props: TravelProps) => (
  <IonCard className={styles.detail_card_sizing}>
    <IonRow className={styles.center_all_row_2}>

      <IonIcon className={styles.train_icon} icon={trainOutline} />
      <IonCol className={styles.mid_section}>
        <IonLabel>
          <h2>
            {formatDateShort(props.journey.startTime)} - {formatDateShort(props.journey.arrivalTime)}
          </h2>
        </IonLabel>
        <IonLabel>
          {props.journey.startStation} - {props.journey.arrivalStation}
        </IonLabel>
      </IonCol>
      <IonCol className={styles.duration}>
        <div>
          <IonRow className={styles.traveltime}>
              {props.journey.travelDurationInMinutes >= 60 && 
                <IonCol>
                <IonLabel className={styles.time_word_center}>
                  <h1>{timeSplitter(props.journey.travelDurationInMinutes)[0]}</h1>
                </IonLabel>
                <IonLabel className={styles.time_word_center}>Std</IonLabel>
              </IonCol>
              }
              <IonCol>
                <IonLabel className={styles.time_word_center}>
                  <h1>{timeSplitter(props.journey.travelDurationInMinutes)[1]}</h1>
                </IonLabel>
                <IonLabel className={styles.time_word_center}>Min</IonLabel>
              </IonCol>
            </IonRow>
        </div>
      </IonCol>
    </IonRow>
  </IonCard>
);

export default JourneyCard;

export interface StepDetailsProps { journey: IJourney, }

