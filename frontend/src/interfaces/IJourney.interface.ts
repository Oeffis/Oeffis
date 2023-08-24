import { IJourneyStep } from "./IJourneyStep.interface";

export interface IJourney {
    travelDuration: number;
    startTime: string;
    arrivalTime: string;
    startStation: string;
    arrivalStation: string;
    stops: IJourneyStep[];
}
