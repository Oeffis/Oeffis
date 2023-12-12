import { Location } from "../../api";
import { IJourney } from "../../interfaces/IJourney.interface";
import JourneyListComponent from "../JourneyListComponent";

export function TripOptionsDisplay(props: {
  origin: Location,
  destination: Location,
  departure: Date,
  asArrival: boolean,
  setJourney: (journey: IJourney) => void
}): JSX.Element {
  const { origin, destination, departure, asArrival } = props;

  return (
    <>
      {result.type === "error" && <div>Error: {result.error.message}</div>}
      {result.type === "pending" && <div>Searching...</div>}
      {iJourneys &&
        <JourneyListComponent setActiveJourney={props.setJourney} journeys={iJourneys} />
      }
    </>
  );
}
