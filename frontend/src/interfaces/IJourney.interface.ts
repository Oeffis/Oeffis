import { IJourneyStep } from "./IJourneyStep.interface";

export interface IJourney {
  travelDurationInMinutes: number;
  startTime: Date;
  arrivalTime: Date;
  startStation: string;
  arrivalStation: string;
  stops: IJourneyStep[];
}
