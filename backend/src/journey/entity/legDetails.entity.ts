import { ApiProperty } from "@nestjs/swagger";
import { LegInfo } from "./legInfo.entity";
import { LegRealtimeTripStatus } from "./legRealtimeTripStatus.entity";

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
    isArray: true,
    enum: LegRealtimeTripStatus
  })
  realtimeTripStatus?: LegRealtimeTripStatus[];

  constructor(distance: number, duration: number, infos: LegInfo[], hints: LegInfo[], realtimeTripStatus?: LegRealtimeTripStatus[]) {
    this.distance = distance;
    this.duration = duration;
    this.infos = infos;
    this.hints = hints;
    this.realtimeTripStatus = realtimeTripStatus;
  }

}
