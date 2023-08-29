import { ApiProperty } from "@nestjs/swagger";
import { LegInfo } from "./legInfo.entity";

export class LegDetails {

  @ApiProperty({
    description: "Distance of leg in meter?",
    type: Number
  })
  distance?: number;

  @ApiProperty({
    description: "Duration of leg in seconds.",
    type: Number
  })
  duration?: number;

  @ApiProperty({
    description: "Leg information.",
    type: [LegInfo]
  })
  infos?: LegInfo[];

  @ApiProperty({
    description: "Leg hints.",
    type: [LegInfo]
  })
  hints?: LegInfo[];

  @ApiProperty({
    description: "Leg real time status.",
    type: String
  })
  realtimeStatus?: string;

  constructor(distance: number, duration: number, infos: LegInfo[], hints: LegInfo[], realtimeStatus: string) {
    this.distance = distance;
    this.duration = duration;
    this.infos = infos;
    this.hints = hints;
    this.realtimeStatus = realtimeStatus;
  }

}

export declare enum RealtimeTripStatus {
  deviation = "DEVIATION",
  extraStops = "EXTRA_STOPS",
  extraTrip = "EXTRA_TRIP",
  monitored = "MONITORED",
  outsideRealtimeWindow = "OUTSIDE_REALTIME_WINDOW",
  prognosisImpossible = "PROGNOSIS_IMPOSSIBLE",
  realtimeOnlyInformative = "REALTIME_ONLY_INFORMATIVE",
  tripCancelled = "TRIP_CANCELLED"
}
