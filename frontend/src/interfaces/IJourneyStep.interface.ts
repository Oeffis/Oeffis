import { LegStats } from "../api";

export interface IJourneyStep {
  stopName: string;
  stationName: string;
  startTime: Date;
  arrivalTime: Date;
  stopIds: string[];
  travelDurationInMinutes: number;
  trackOrigin: string;
  trackDestination: string;
  line: string;
  stats: LegStats;
}
