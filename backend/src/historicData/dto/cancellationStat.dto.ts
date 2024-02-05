import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsNumber, Max, Min } from "class-validator";
import { MaybeStats } from "./maybeStats.dto";

export class CancellationStat extends MaybeStats {

  @Equals("available")
  public readonly status: string = "available";

  @IsNumber()
  @Max(1.0)
  @Min(0.0)
  @ApiProperty({
    description: "Probability of leg/trip being cancelled in the past.",
    type: Number,
    required: true,
    example: 0.46
  })
  cancellationProbability: number;

  @IsNumber()
  @Max(1.0)
  @Min(0.0)
  @ApiProperty({
    description: "Probability of leg/trip being cancelled on same day of week (dow) and time in the past.",
    type: Number,
    required: true,
    example: 0.49
  })
  cancellationAtDowTimeProbability: number;

  public constructor(
    cancellationProbability: number,
    cancellationAtDowTimeProbability: number
  ) {
    super("available");
    this.cancellationProbability = cancellationProbability;
    this.cancellationAtDowTimeProbability = cancellationAtDowTimeProbability;
  }
}
