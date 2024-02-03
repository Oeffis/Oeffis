import { FootpathLeg, Journey, JourneyApi, LegDestinationLocationTypeEnum, LegOriginLocationTypeEnum, LocationFinderApi, TransportationLeg, TransportationLegTypeEnum } from "../../api";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";

let selectedJourneyJSON: string | null;
const blackList: number[] = [];

export function parseJSONToJourney(journey: string | null): IJourney {
  let iJourney: IJourney;
  if (journey !== null) {
    iJourney = JSON.parse(journey) as IJourney;
    iJourney.arrivalTime = new Date(iJourney.arrivalTime);
    iJourney.startTime = new Date(iJourney.startTime);

    for (const step of iJourney.stops) {
      step.arrivalTime = new Date(step.arrivalTime);
      step.startTime = new Date(step.startTime);
    }

    return iJourney;
  }

  return {} as IJourney;
}

export async function findJourneyFromNextStop(locationFinderApi: LocationFinderApi, journeyApi: JourneyApi): Promise<void> {
  const nextStop = getNextStop();
  if (!nextStop) {
    return;
  }

  const originLocations = await locationFinderApi.locationFinderControllerFindLocationsByName({ name: nextStop.stopName });
  const arrivalLocations = await locationFinderApi.locationFinderControllerFindLocationsByName({ name: parseJSONToJourney(selectedJourneyJSON)?.arrivalStation });
  const origin = originLocations[0];
  const arrival = arrivalLocations[0];
  const journeys = await journeyApi.journeyControllerQueryJourney({ originId: origin.id, destinationId: arrival.id, asArrival: false, departure: nextStop.arrivalTime });
  const filteredJourneys = journeys.filter(journey =>
    journey.legs[0].origin.departureTimeEstimated > nextStop.arrivalTime &&
    journey.legs[journey.legs.length - 1].destination.arrivalTimeEstimated < parseJSONToJourney(selectedJourneyJSON)?.arrivalTime
  );

  if (!filteredJourneys[0]) {
    return;
  }

  const iJourney = parseJourneyToIJourney(filteredJourneys[0]);

  if (blackList.includes(iJourney.travelDurationInMinutes)) {
    return;
  }

  window.localStorage.setItem("recJourney", JSON.stringify(iJourney));
}

export function blackListJourney(): void {

  const journey: IJourney = parseJSONToJourney(window.localStorage.getItem("recJourney"));

  blackList.push(journey.travelDurationInMinutes);
  window.localStorage.removeItem("recJourney");
}

function getNextStop(): IJourneyStep | undefined {
  selectedJourneyJSON = window.localStorage.getItem("selectedJourney");
  const journey = parseJSONToJourney(selectedJourneyJSON);
  const stops = journey.stops;
  if (stops) {
    stops.pop();
  }

  const filteredStops = stops.filter(stop =>
    stop.arrivalTime > new Date()
  );

  const nextStop: IJourneyStep | undefined = filteredStops[0];
  return nextStop;
}

function parseJourneyToIJourney(journey: Journey): IJourney {

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
      stopIds: leg.details.stopSequence.map(jl => jl.id),
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
      stats: leg.type === TransportationLegTypeEnum.Transportation
        ? (leg as TransportationLeg).legStats
        : {
          originDelayStats: { status: "unavailable", reason: "Fußpfad" },
          destinationDelayStats: { status: "unavailable", reason: "Fußpfad" },
          interchangeReachableStat: { status: "unavailable", reason: "Fußpfad" },
          cancellationStat: { status: "unavailable", reason: "Fußpfad" }
        }
    })),
    travelDurationInMinutes: legs.reduce((acc, leg) => acc + leg.details.duration, 0) / 60
  };
}
