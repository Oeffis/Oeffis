import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsNumber, IsPositive } from "class-validator";
import { MaybeStats } from "./maybeStats.dto";

export class DelayStats extends MaybeStats {

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
