import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

/**
 * Details / navigation information about a footpath.
 */
export class Footpath {

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: "Total duration of the footpath in seconds.",
    type: Number,
    required: true,
    example: 360
  })
  totalDuration!: number;

  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    description: "Total distance of the footpath in meters.",
    type: Number,
    example: 250
  })
  totalDistance?: number;

  // TODO Include further details from VRR FootPathInfoClass / PathDescriptionClass,
  //  see: https://github.com/Oeffis/Oeffis/wiki/Custom-Types#footpath-information.

  constructor(
    totalDuration: number,
    totalDistance?: number) {

    this.totalDuration = totalDuration;
    this.totalDistance = totalDistance;
  }
}
