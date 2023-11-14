import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class LegStats {
  @IsNumber()
  @ApiProperty({
    description: "The average delay.",
    type: Number,
    required: true,
    example: 7.5
  })
  avgDelay: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: "The standard deviation of the delay.",
    type: Number,
    required: true,
    example: 8
  })
  stdDev: number;

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
    this.avgDelay = avgDelay;
    this.stdDev = stdDev;
    this.maxDelay = maxDelay;
    this.minDelay = minDelay;
  }
}
