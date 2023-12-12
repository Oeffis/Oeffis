import { Location } from "../../api";
import { IJourney } from "../../interfaces/IJourney.interface";
import JourneyListComponent from "../JourneyListComponent";

export function TripOptionsDisplay(props: {
  iJourneys: false | IJourney[],
  setJourney: (journey: IJourney) => void
}): JSX.Element {
  const { iJourneys, setJourney } = props;

  return (
    <>
      {iJourneys &&
        <JourneyListComponent setActiveJourney={props.setJourney} journeys={iJourneys} />
      }
    </>
  );
}
