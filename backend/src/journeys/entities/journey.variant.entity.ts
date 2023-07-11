import { ApiProperty } from "@nestjs/swagger";
import { Journey } from "hafas-client";

/**
 * Represents one variant of a journey with a set point of time when the data have been fetched.
 */
export class JourneyVariant {

  @ApiProperty({
    description: "One variant of a planned journey (Friendly Public Transport Format, FPTF).",
    required: true
  })
  journey!: Journey; // TODO Should not use 3rd party types.

  @ApiProperty({
    description: "Point of time the data of the journey variant has been fetched.",
    type: Number,
    required: true
  })
  updatedAt!: number;

}
