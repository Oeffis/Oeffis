import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsPositive } from "class-validator";

export class MaybeLegStats { }

export class LegStats extends MaybeLegStats {
  @IsNumber()
  @ApiProperty({
    description: "The average delay.",
    type: Number,
    required: true,
    example: 7.5
  })
  averageDelay: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: "The standard deviation of the delay.",
    type: Number,
    required: true,
    example: 8
  })
  standardDeviation: number;

  @IsNumber()
  @ApiProperty({
    description: "The maximum delay of the leg.",
    type: Number,
    required: true,
    example: 120
  })
  maxDelay: number;

  @IsNumber()
  @ApiProperty({
    description: "The minimum delay of the leg.",
    type: Number,
    required: true,
    example: 0
  })
  minDelay: number;

  public constructor(
    avgDelay: number,
    stdDev: number,
    maxDelay: number,
    minDelay: number
  ) {
    super();
    this.averageDelay = avgDelay;
    this.standardDeviation = stdDev;
    this.maxDelay = maxDelay;
    this.minDelay = minDelay;
  }
}

export enum UnavailableReason {
  noData = "NO_DATA"
}

export class UnavailableLegStats extends MaybeLegStats {
  @IsEnum(UnavailableReason)
  @ApiProperty({
    description: "The reason, why the data is not available",
    type: UnavailableReason,
    required: true,
    example: UnavailableReason.noData
  })
  reason: UnavailableReason;

  public constructor(reason: UnavailableReason) {
    super();
    this.reason = reason;
  }
}
