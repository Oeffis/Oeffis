import { IonCard, IonCol, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { format } from "date-fns";
import { trainOutline } from "ionicons/icons";
import { IJourney } from "../interfaces/IJourney.interface";
import jc from "./JourneyCard.module.css";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "HH:mm");

const timeSplitter = (traveltime: number): number[] => {
  const traveltimeHours = Math.floor(traveltime / 60);
  const traveltimeMinutes = traveltime % 60;
  return [traveltimeHours, traveltimeMinutes];

  //TODO: Round uneven minutes
};

const JourneyCard: React.FC<TravelProps> = (props: TravelProps) => (
  <IonCard className={jc.detail_card_sizing}>
    <IonRow className={jc.center_all_row_2}>

      <IonIcon className={jc.train_icon} icon={trainOutline} />
      <IonCol className={jc.mid_section}>
        <IonLabel>
          <h2>
            {formatDateShort(props.journey.startTime)} - {formatDateShort(props.journey.arrivalTime)}
          </h2>
        </IonLabel>
        <IonLabel>
          {props.journey.startStation} - {props.journey.arrivalStation}
        </IonLabel>
      </IonCol>
      <IonCol className={jc.duration}>
        <div>
          {props.journey.travelDurationInMinutes < 60 && (
            <IonRow className={jc.traveltime}>
              <IonCol>
                <IonLabel className={jc.time_word_center}>
                  <h1>{props.journey.travelDurationInMinutes}</h1>
                </IonLabel>
                <IonLabel className={jc.time_word_center}>Min</IonLabel>
              </IonCol>
            </IonRow>
          )}
        </div>
        <div>
          {props.journey.travelDurationInMinutes >= 60 && (
            <IonRow className={jc.traveltime}>
              <IonCol>
                <IonLabel className={jc.time_word_center}>
                  <h1>{timeSplitter(props.journey.travelDurationInMinutes)[0]}</h1>
                </IonLabel>
                <IonLabel className={jc.time_word_center}>Std</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel className={jc.time_word_center}>
                  <h1>{timeSplitter(props.journey.travelDurationInMinutes)[1]}</h1>
                </IonLabel>
                <IonLabel className={jc.time_word_center}>Min</IonLabel>
              </IonCol>
            </IonRow>
          )}
        </div>
      </IonCol>
    </IonRow>
  </IonCard>
);

export default JourneyCard;

export interface StepDetailsProps { journey: IJourney, }

