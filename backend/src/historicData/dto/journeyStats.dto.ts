import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DelayStats } from "./delayStats.dto";
import { MaybeStats, UnavailableStats } from "./maybeStats.dto";
import { QualityStats } from "./qualityStats.dto";

@ApiExtraModels(DelayStats, QualityStats, UnavailableStats)
export class JourneyStats {

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

  @ApiProperty({
    description: "Stats about quality of journey (e.g. connections).",
    oneOf: [
      { $ref: getSchemaPath(QualityStats) },
      { $ref: getSchemaPath(UnavailableStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(QualityStats),
        "unavailable": getSchemaPath(UnavailableStats)
      }
    },
    required: true
  })
  journeyQualityStats: MaybeStats;

  public constructor(
    aggregatedDelayStats: MaybeStats,
    journeyQualityStats: MaybeStats
  ) {
    this.aggregatedDelayStats = aggregatedDelayStats;
    this.journeyQualityStats = journeyQualityStats;
  }
}
