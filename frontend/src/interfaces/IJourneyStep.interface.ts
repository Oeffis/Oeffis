import { LegStats, UnavailableLegStats } from "../api";

export interface IJourneyStep {
  stopName: string;
  stationName: string;
  startTime: Date;
  arrivalTime: Date;
  travelDurationInMinutes: number;
  track: string;
  line: string;
  stats: LegStats | UnavailableLegStats;
}
