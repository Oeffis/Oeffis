import { ApiProperty } from "@nestjs/swagger";

/** Type alias for station and stop ids. */
type StationStopLocationId = string;

/**
 * Represent a request to plan a journey.
 */
export class JourneysRequest {

  @ApiProperty({
    description: "Where the journey starts (id of station/stop/location).",
    required: true
  })
  from!: StationStopLocationId;

  @ApiProperty({
    description: "Where the journey ends (id of station/stop/location).",
    required: true
  })
  to!: StationStopLocationId;

}
