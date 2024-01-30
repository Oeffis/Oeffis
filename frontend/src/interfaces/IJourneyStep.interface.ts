import { LegStats } from "../api";

export interface IJourneyStep {
  stopName: string;
  stationName: string;
  startTime: Date;
  arrivalTime: Date;
  stopIds: string[];
  travelDurationInMinutes: number;
  track: string;
  line: string;
  stats: LegStats;
}
