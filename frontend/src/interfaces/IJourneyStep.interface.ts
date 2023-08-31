export interface IJourneyStep {
  stopName: string;
  stationName: string;
  startTime: Date;
  arrivalTime: Date;
  travelDurationInMinutes: number;
  track: string;
}
