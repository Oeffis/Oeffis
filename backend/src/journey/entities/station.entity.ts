import {ApiProperty} from "@nestjs/swagger";

/**
 * Represents one waypoint of a journey.
 */
export class Station {

  @ApiProperty({
    description: "Name of a station.",
    example: "Wuppertal Hbf",
    required: true,
  })
  name: string;

}
