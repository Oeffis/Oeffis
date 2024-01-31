import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsNumber, Max, Min } from "class-validator";
import { MaybeStats } from "./maybeStats.dto";

export class InterchangeReachableStat extends MaybeStats {

  @Equals("available")
  public readonly status: string = "available";

  @IsNumber()
  @Max(1.0)
  @Min(0.0)
  @ApiProperty({
    description: "Probability of interchange(s) (following current leg) that were successful in the past.",
    type: Number,
    required: true,
    example: 0.75
  })
  interchangeReachableProbability: number;

  public constructor(
    interchangeReachableProbability: number
  ) {
    super("available");
    this.interchangeReachableProbability = interchangeReachableProbability;
  }
}
