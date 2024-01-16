import { differenceInMinutes } from "date-fns";
import {
  FootpathLeg,
  LegDestinationLocationTypeEnum,
  LegOriginLocationTypeEnum,
  Location,
  TransportationLeg,
  TransportationLegTypeEnum
} from "../../api";
import { useJourneyQuery } from "../../hooks/useJourneyQuery";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import JourneyListComponent from "../JourneyListComponent";

export function TripOptionsDisplay(props: {
  origin: Location,
  destination: Location,
  departure: Date,
  asArrival: boolean,
  setJourney: (journey: IJourney) => void
}): JSX.Element {
  const { origin, destination, departure, asArrival } = props;

  const result = useJourneyQuery(origin, destination, departure, asArrival);

  const iJourneys: false | IJourney[] = result.type === "success"
    && result.journeyResults
      .map((journey): IJourney => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const legs: (TransportationLeg | FootpathLeg)[] = journey.legs;

        const lastLeg = legs[legs.length - 1];
        const firstLeg = legs[0];

        return {
          startStation: firstLeg.origin.name,
          startTime: firstLeg.origin.departureTimeEstimated,
          arrivalStation: lastLeg.destination.name,
          arrivalTime: lastLeg.destination.arrivalTimeEstimated,
          stops: legs.map((leg): IJourneyStep => ({
            arrivalTime: leg.destination.arrivalTimeEstimated,
            startTime: leg.origin.departureTimeEstimated,
            stationName: leg.origin.name,
            trackOrigin: leg.origin.type === LegOriginLocationTypeEnum.Platform
              ? leg.origin.details.shortName
              : "",
            trackDestination: leg.destination.type === LegDestinationLocationTypeEnum.Platform
              ? leg.destination.details.shortName
              : "",
            stopName: leg.destination.name,
            travelDurationInMinutes: leg.details.duration / 60,
            line: "transportation" in leg ? leg.transportation.line : "",
            stats: leg.type === TransportationLegTypeEnum.Transportation ? (leg as TransportationLeg).delayStats : {
              destinationDelayStats: { status: "unavailable", reason: "Fußpfad" },
              originDelayStats: { status: "unavailable", reason: "Fußpfad" }
            }
          })),
          travelDurationInMinutes: differenceInMinutes(lastLeg.destination.arrivalTimeEstimated, firstLeg.origin.departureTimeEstimated)
        };
      });

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
