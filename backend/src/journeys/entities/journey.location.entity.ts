import { ApiProperty } from "@nestjs/swagger";
import { Location, Station, Stop } from "hafas-client";

/**
 * Represent a location in context of a journey.
 */
export class JourneyLocation {

  @ApiProperty({
    description: "One location that can be a FPTF station, stop or location (FPTF = Friendly Public Transport Format).",
    required: true
  })
  location!: (Station | Stop | Location); // TODO Should not use 3rd party types.

}
