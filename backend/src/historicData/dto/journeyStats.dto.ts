import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsInstance } from "class-validator";
import { CancellationStat } from "./cancellationStat.dto";
import { DelayStats } from "./delayStats.dto";
import { InterchangeReachableStat } from "./interchangeReachableStat.dto";
import { MaybeStats, UnavailableStats } from "./maybeStats.dto";

@ApiExtraModels(DelayStats, InterchangeReachableStat, CancellationStat, UnavailableStats)
export class JourneyStats {

  @IsInstance(MaybeStats)
  @ApiProperty({
    description: "Aggregated delay statistics of all journey's legs.",
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
  aggregatedDelayStats: MaybeStats;

  @IsInstance(MaybeStats)
  @ApiProperty({
    description: "Aggregated probability of reaching interchanges on journey.",
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
  aggregatedInterchangeReachableStat: MaybeStats;

  @IsInstance(MaybeStats)
  @ApiProperty({
    description: "Aggregated probability of cancellation to happen on journey.",
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
  aggregatedCancellationStat: MaybeStats;

  public constructor(
    aggregatedDelayStats: DelayStats,
    aggregatedInterchangeReachableStat: InterchangeReachableStat,
    aggregatedCancellationStat: CancellationStat
  ) {
    this.aggregatedDelayStats = aggregatedDelayStats;
    this.aggregatedInterchangeReachableStat = aggregatedInterchangeReachableStat;
    this.aggregatedCancellationStat = aggregatedCancellationStat;
  }
}
