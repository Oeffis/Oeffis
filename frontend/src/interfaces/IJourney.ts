import { IJourneyStep } from "./IJourneyStep";

export interface IJourney {
    travelDuration: number;
    startTime: string;
    arrivalTime: string;
    startStation: string;
    arrivalStation: string;
    stops: IJourneyStep[];
}
