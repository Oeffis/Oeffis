 
import { IonButton, IonCard, IonIcon, IonImg, IonLabel } from "@ionic/react";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import "./RouteOptionDetail.css";
import { IJourney } from "../interfaces/IJourney.interface";
import JourneyStepComponent from "./JourneyStepComponent";
import { useState } from "react";

export interface travelProps {journey: IJourney}



const RouteOptionDetail: React.FC<travelProps> = (props: travelProps) => {
    const [showDetails, setShowDetails] = useState(false);
    
    const openDetails = (): void => {
        setShowDetails(!showDetails);
        console.log(showDetails);
    };
    return (
        <div className="RouteOptionDetail">
                <IonCard className="detail-card">
                    <div className="content-section">
                        <div className="img-container">
                            <IonImg src="./images/train_image.png"/>
                        </div>
                        <div className="mid-section">
                            <IonLabel>
                                {props.journey.startTime} - {props.journey.arrivalTime}
                            </IonLabel>
                            <IonLabel>
                                {props.journey.startStation} - {props.journey.arrivalStation}
                            </IonLabel>
                        </div>
                        <div className="duration">
                            <IonLabel>
                                {props.journey.travelDuration}
                            </IonLabel>
                            <IonLabel>
                                Min
                            </IonLabel>
                        </div>
                    </div>
                    {showDetails
                        ? <div className="bottom-section-opened">
                        <div className="steps">
                            <JourneyStepComponent step={props.journey.stops[0]}/>
                            <JourneyStepComponent step={props.journey.stops[1]}/>
                        </div>
                            <IonButton fill="clear" onClick={(openDetails)}>
                                <IonIcon icon={chevronUpOutline} size="small"/>
                            </IonButton>
                        </div>
                        : <div className="bottom-section-closed">
                            <IonButton fill="clear" onClick={(openDetails)}>
                                <IonIcon icon={chevronDownOutline} onClick={openDetails} size="small"/>
                            </IonButton>
                        </div>}
                </IonCard>
            </div>
    );
};
  
  export default RouteOptionDetail;
  