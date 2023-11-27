import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsEnum, IsNumber, IsPositive } from "class-validator";

export class MaybeLegStats {
  @ApiProperty({
    description: "Wether leg stats are available",
    type: Boolean,
    required: true,
    example: true
  })
  public readonly areAvailable: boolean;

  public constructor(
    areAvailable: boolean
  ) {
    this.areAvailable = areAvailable;
  }
}

export class LegStats extends MaybeLegStats {
  @Equals(true)
  public readonly areAvailable = true;

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
    super(true);
    this.averageDelay = avgDelay;
    this.standardDeviation = stdDev;
    this.maxDelay = maxDelay;
    this.minDelay = minDelay;
  }
}

export enum UnavailableReason {
  noData = "NO_DATA",
  internalError = "QUERY_ERROR"
}

export class UnavailableLegStats extends MaybeLegStats {
  @Equals(false)
  public readonly areAvailable = false;

  @IsEnum(UnavailableReason)
  @ApiProperty({
    description: "The reason, why the data is not available",
    type: String,
    required: true,
    example: UnavailableReason.noData
  })
  reason: UnavailableReason;

  public constructor(reason: UnavailableReason) {
    super(false);
    this.reason = reason;
  }
}
