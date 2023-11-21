import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Equals, IsEnum, IsInstance, IsNumber, IsPositive } from "class-validator";

export class MaybeDelayStats {
  @ApiProperty({
    description: "Status of the leg stats.",
    type: String,
    enum: ["available", "unavailable"],
    required: true,
    example: "available"
  })
  public readonly status: string;

  public constructor(
    status: string
  ) {
    this.status = status;
  }
}

export enum UnavailableReason {
  noData = "NO_DATA",
  internalError = "QUERY_ERROR"
}

export class UnavailableDelayStats extends MaybeDelayStats {
  @Equals("unavailable")
  public readonly status: string = "unavailable";

  @IsEnum(UnavailableReason)
  @ApiProperty({
    description: "The reason, why the data is not available",
    type: String,
    required: true,
    example: UnavailableReason.noData
  })
  reason: UnavailableReason;

  public constructor(reason: UnavailableReason) {
    super("unavailable");
    this.reason = reason;
  }
}

export class DelayStats extends MaybeDelayStats {

  @Equals("available")
  public readonly status: string = "available";

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
    description: "The maximum delay.",
    type: Number,
    required: true,
    example: 120
  })
  maxDelay: number;

  @IsNumber()
  @ApiProperty({
    description: "The minimum delay.",
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
    super("available");
    this.averageDelay = avgDelay;
    this.standardDeviation = stdDev;
    this.maxDelay = maxDelay;
    this.minDelay = minDelay;
  }
}

@ApiExtraModels(DelayStats, UnavailableDelayStats)
export class LegStats {

  @ApiProperty({
    description: "Delay statistics at origin.",
    oneOf: [
      { $ref: getSchemaPath(DelayStats) },
      { $ref: getSchemaPath(UnavailableDelayStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(DelayStats),
        "unavailable": getSchemaPath(UnavailableDelayStats)
      }
    },
    required: true
  })
  originDelayStats: MaybeDelayStats;

  @IsInstance(DelayStats)
  @ApiProperty({
    description: "Delay statistics at destination.",
    oneOf: [
      { $ref: getSchemaPath(DelayStats) },
      { $ref: getSchemaPath(UnavailableDelayStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(DelayStats),
        "unavailable": getSchemaPath(UnavailableDelayStats)
      }
    },
    required: true
  })
  destinationDelayStats: MaybeDelayStats;

  public constructor(
    originDelayStats: DelayStats,
    destinationDelayStats: DelayStats
  ) {
    this.originDelayStats = originDelayStats;
    this.destinationDelayStats = destinationDelayStats;
  }
}
