import {ApiProperty} from "@nestjs/swagger";
import {Station} from "./station.entity";

/**
 * Represents a journey that have been planned.
 */
export class Journey {

  // Minimal set of fields for now.

  @ApiProperty({
    description: 'Station where the journey starts.',
  })
  from: Station;

  @ApiProperty({
    description: 'Station where the journey ends.',
  })
  to: Station;


  // TODO Which fields are needed for now?


}
