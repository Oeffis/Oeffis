 
import { IonCard, IonIcon, IonImg, IonLabel } from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";
import "./RouteOptionDetail.css";

export interface travelProps {startTime: string, arrivalTime: string, startingStation: string, arrivalStation: string, stops: string[], travelDuration: number}

const RouteOptionDetail: React.FC<travelProps> = (props: travelProps) => (
    <div className="RouteOptionDetail">
        <IonCard className="detail-card">
            <div className="content-section">
                <div className="img-container">
                    <IonImg src="./images/train_image.png"/>
                </div>
                <div className="mid-section">
                    <IonLabel>
                        {props.startTime} - {props.arrivalTime}
                    </IonLabel>
                    <IonLabel>
                        {props.startingStation} - {props.arrivalStation}
                    </IonLabel>
                </div>
                <div className="duration">
                    <IonLabel>
                        {props.travelDuration}
                    </IonLabel>
                    <IonLabel>
                        Min
                    </IonLabel>
                </div>
            </div>
            <div className="bottom-section">
                <IonIcon icon={chevronDownOutline} size="small"/>
            </div>
        </IonCard>
    </div>
  );
    
  
  export default RouteOptionDetail;
  