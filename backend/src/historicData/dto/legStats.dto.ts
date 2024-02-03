import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsInstance } from "class-validator";
import { CancellationStat } from "./cancellationStat.dto";
import { DelayStats } from "./delayStats.dto";
import { InterchangeReachableStat } from "./interchangeReachableStat.dto";
import { MaybeStats, UnavailableStats } from "./maybeStats.dto";

@ApiExtraModels(DelayStats, InterchangeReachableStat, CancellationStat, UnavailableStats)
export class LegStats {

  @IsInstance(MaybeStats)
  @ApiProperty({
    description: "Delay statistics at origin of leg/trip.",
    oneOf: [
      { $ref: getSchemaPath(DelayStats) },
      { $ref: getSchemaPath(UnavailableStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(DelayStats),
        "unavailable": getSchemaPath(UnavailableStats)
      }
    },
    required: true
  })
  originDelayStats: DelayStats | UnavailableStats;

  @IsInstance(MaybeStats)
  @ApiProperty({
    description: "Delay statistics at destination of leg/trip.",
    oneOf: [
      { $ref: getSchemaPath(DelayStats) },
      { $ref: getSchemaPath(UnavailableStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(DelayStats),
        "unavailable": getSchemaPath(UnavailableStats)
      }
    },
    required: true
  })
  destinationDelayStats: DelayStats | UnavailableStats;

  @IsInstance(MaybeStats)
  @ApiProperty({
    description: "Stat about interchange to following leg/trip being successful.",
    oneOf: [
      { $ref: getSchemaPath(InterchangeReachableStat) },
      { $ref: getSchemaPath(UnavailableStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(InterchangeReachableStat),
        "unavailable": getSchemaPath(UnavailableStats)
      }
    },
    required: true
  })
  interchangeReachableStat: InterchangeReachableStat | UnavailableStats;

  @IsInstance(MaybeStats)
  @ApiProperty({
    description: "Stat about leg/trip being cancelled.",
    oneOf: [
      { $ref: getSchemaPath(CancellationStat) },
      { $ref: getSchemaPath(UnavailableStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(CancellationStat),
        "unavailable": getSchemaPath(UnavailableStats)
      }
    },
    required: true
  })
  cancellationStat: CancellationStat | UnavailableStats;

  public constructor(
    originDelayStats: DelayStats | UnavailableStats,
    destinationDelayStats: DelayStats | UnavailableStats,
    interchangeReachableStat: InterchangeReachableStat | UnavailableStats,
    cancellationStat: CancellationStat | UnavailableStats
  ) {
    this.originDelayStats = originDelayStats;
    this.destinationDelayStats = destinationDelayStats;
    this.interchangeReachableStat = interchangeReachableStat;
    this.cancellationStat = cancellationStat;
  }
}
