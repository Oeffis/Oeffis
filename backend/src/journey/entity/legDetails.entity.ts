import { ApiPropertyOptional } from "@nestjs/swagger";
import { LegRealtimeTripStatus } from "../../vrr/entity/legRealtimeTripStatus.entity";
import { LegInfo } from "./legInfo.entity";

export class LegDetails {

  @ApiPropertyOptional({
    description: "Distance of leg in meter?",
    type: Number
  })
  distance?: number;

  @ApiPropertyOptional({
    description: "Duration of leg in seconds.",
    type: Number,
    example: 480
  })
  duration?: number;

  @ApiPropertyOptional({
    description: "Leg information.",
    type: [LegInfo]
  })
  infos?: LegInfo[];

  @ApiPropertyOptional({
    description: "Leg hints.",
    type: [LegInfo]
  })
  hints?: LegInfo[];

  @ApiPropertyOptional({
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
