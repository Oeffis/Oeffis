import { IonItem, IonList } from "@ionic/react";
import { IJourney } from "../interfaces/IJourney.interface";
import JourneyCard from "./JourneyCard";
import jlc from "./JourneyListComponent.module.css";

interface IJourneyListProps {
  setActiveJourney: (journey: IJourney) => void,
  journeys: IJourney[]
}

const JourneyListComponent: React.FC<IJourneyListProps> = (props: IJourneyListProps) => (
  <div className="JourneyListComponent">
    <IonList className={jlc.detail_list_sizing} inset={false} lines="none">
      {(props.journeys.map((journey, index) =>
        <IonItem key={"item" + index} onClick={() => props.setActiveJourney(journey)}>
          <JourneyCard key={"journey" + index} journey={journey} />
        </IonItem>
      ))}
    </IonList>
  </div>
);

export default JourneyListComponent;
