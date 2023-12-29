import { Journey } from "../../api";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import { useJourneyApi, useLocationFinderApi } from "../apiClients/ApiClientsContext";

const selectedJourneyAsString = window.localStorage.getItem("selectedJourney");

export function getNextStop(): IJourneyStep | undefined {
  const journey = getSelectedJourney();
  const stops = journey.stops;
  stops.pop();

  const filteredStops = stops.filter(stop =>
    stop.arrivalTime > new Date()
  );

  const nextStop: IJourneyStep | undefined = filteredStops[0];
  return nextStop;
}

export function getSelectedJourney(): IJourney {
  let selectedJourney: IJourney;
  if (selectedJourneyAsString !== null) {
    selectedJourney = JSON.parse(selectedJourneyAsString) as IJourney;
    selectedJourney.arrivalTime = new Date(selectedJourney.arrivalTime);
    selectedJourney.startTime = new Date(selectedJourney.startTime);

    for (const step of selectedJourney.stops) {
      step.arrivalTime = new Date(step.arrivalTime);
      step.startTime = new Date(step.startTime);
    }

    return selectedJourney;
  }

  return {} as IJourney;
}

export async function findRouteFromNextStop(): Promise<Journey[]> {
  const nextStop = getNextStop();
  if (!nextStop) {
    return [];
  }

  const locationFinderApi = useLocationFinderApi();
  const journeyApi = useJourneyApi();

  const originLocations = await locationFinderApi.locationFinderControllerFindLocationsByName({ name: nextStop.stopName });
  const arrivalLocations = await locationFinderApi.locationFinderControllerFindLocationsByName({ name: getSelectedJourney()?.arrivalStation });
  const origin = originLocations[0];
  const arrival = arrivalLocations[0];
  const journeys = await journeyApi.journeyControllerQueryJourney({ originId: origin.id, destinationId: arrival.id, asArrival: false, departure: nextStop.arrivalTime });
  const filteredJourneys = journeys.filter(journey =>
    journey.legs[0].origin.departureTimeEstimated > nextStop.arrivalTime &&
    journey.legs[journey.legs.length - 1].destination.arrivalTimeEstimated < getSelectedJourney()?.arrivalTime
  );

  return filteredJourneys;
}
