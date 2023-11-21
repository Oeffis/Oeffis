import { IonItem, IonList } from "@ionic/react";
import { IJourney } from "../interfaces/IJourney.interface";
import JourneyCard from "./JourneyCard";

const JourneyListComponent: React.FC<{ journeys: IJourney[] }> = (props: { journeys: IJourney[] }) => (
  <div className="JourneyListComponent">
    <IonList className="detail-card">
      {props.journeys.map((journey, index) =>
        <IonItem onClick={() => console.log(journey)}>
          <JourneyCard key={"journey" + index} journey={journey} />
        </IonItem>
      )}
    </IonList>
  </div>
);

export default JourneyListComponent;
