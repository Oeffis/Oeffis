import { IonList } from "@ionic/react";
import { IJourney } from "../interfaces/IJourney.interface";
import JourneyDetail from "./JourneyDetail";

const JourneyListComponent: React.FC<{journeys: IJourney[]}> = (props: {journeys: IJourney[]}) => (
        <div className="JourneyListComponent">
            <IonList className="detail-card">
                {props.journeys.map(
                    journey => 
                    <JourneyDetail journey={journey} />
                    )}
            </IonList>
        </div>
    );
  
  export default JourneyListComponent;
  