import { ApiProperty } from "@nestjs/swagger";

export class LegDetails {

  @ApiProperty({
    description: "Distance.",
    type: Number
  })
  distance?: number;

  @ApiProperty({
    description: "Duration.",
    type: Number
  })
  duration?: number;

  @ApiProperty({
    description: "Leg information.",
    type: String
  })
  infos?: string; // Info[]

  @ApiProperty({
    description: "Leg hints.",
    type: String
  })
  hints?: string; // Info[]

  @ApiProperty({
    description: "Leg real time status.",
    type: String
  })
  realtimeStatus?: string; // RealtimeTripStatus

  constructor(distance: number, duration: number, infos: string, hints: string, realtimeStatus: string) {
    this.distance = distance;
    this.duration = duration;
    this.infos = infos;
    this.hints = hints;
    this.realtimeStatus = realtimeStatus;
  }

}
