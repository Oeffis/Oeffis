import {ApiProperty} from "@nestjs/swagger";
import {Location, Station, Stop} from "hafas-client";

/**
 * Represent a request to plan a journey.
 */
export class JourneyRequest {

  @ApiProperty({
    description: "Where the journey starts.",
    required: true
  })
  from: (string | Station | Stop | Location);

  @ApiProperty({
    description: "Where the journey ends.",
    required: true
  })
  to: (string | Station | Stop | Location);

}
