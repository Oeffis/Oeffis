import { IonButton, IonCard, IonIcon, IonImg, IonLabel } from "@ionic/react";
import { format } from "date-fns";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { useState } from "react";
import { IJourney } from "../interfaces/IJourney.interface";
import "./JourneyDetail.css";
import JourneyStepComponent from "./JourneyStepComponent";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "dd.MM. HH:mm");

const JourneyDetail: React.FC<TravelProps> = (props: TravelProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const openDetails = (): void => {
    setShowDetails(!showDetails);
    console.log(showDetails);
  };
  return (
    <div className="JourneyDetail" data-testid="journey-details">
      <IonCard className="detail-card">
        <div className="content-section">
          <div className="img-container">
            <IonImg src="./images/train_image.png" />
          </div>
          <div className="mid-section">
            <IonLabel>
              <span data-testid="journey-details-start-time">{formatDateShort(props.journey.startTime)}</span>
              -
              <span data-testid="journey-details-end-time">{formatDateShort(props.journey.arrivalTime)}</span>
            </IonLabel>
            <IonLabel>
              {props.journey.startStation} - {props.journey.arrivalStation}
            </IonLabel>
          </div>
          <div className="duration">
            <IonLabel data-testid="journey-details-duration">
              {props.journey.travelDurationInMinutes}
            </IonLabel>
            <IonLabel>
              Min
            </IonLabel>
          </div>
        </div>
        {showDetails
          ? <div className="bottom-section-opened">
            <div className="steps">
              {props.journey.stops.map((step, index) => <JourneyStepComponent key={"journeyStep" + index} step={step} />)}
            </div>
            <IonButton fill="clear" onClick={(openDetails)}>
              <IonIcon icon={chevronUpOutline} size="small" />
            </IonButton>
          </div>
          : <div className="bottom-section-closed">
            <IonButton fill="clear" onClick={(openDetails)} data-testid="journey-details-open">
              <IonIcon icon={chevronDownOutline} onClick={openDetails} size="small" />
            </IonButton>
          </div>}
      </IonCard>
    </div>
  );
};

export default JourneyDetail;
