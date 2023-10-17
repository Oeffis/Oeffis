import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInstance, IsNumber, IsOptional } from "class-validator";
import { LegRealtimeTripStatus } from "../../vrr/entity/legRealtimeTripStatus.entity";
import { LegInfo } from "./legInfo.entity";

export class LegDetails {

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Distance of leg in meter?",
    type: Number
  })
  distance?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Duration of leg in seconds.",
    type: Number,
    example: 480
  })
  duration?: number;

  @IsArray()
  @IsInstance(LegInfo, { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: "Leg information.",
    type: [LegInfo]
  })
  infos?: LegInfo[];

  @IsArray()
  @IsInstance(LegInfo, { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: "Leg hints.",
    type: [LegInfo]
  })
  hints?: LegInfo[];

  @IsArray()
  @IsEnum(LegRealtimeTripStatus, { each: true })
  @IsOptional()
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
