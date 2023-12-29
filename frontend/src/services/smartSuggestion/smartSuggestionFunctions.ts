import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";

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

export function findRouteFromNextStop(): void {
  const nextStop = getNextStop();
  const destination = getSelectedJourney().arrivalStation;
  if (!nextStop) {
    return undefined;
  }

  console.log(nextStop.stopName);
  console.log(destination);
}
