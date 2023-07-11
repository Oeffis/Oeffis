import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { JourneyStopStationIdDto, JourneyUserLocationDto } from "./journey.location.dto";

/**
 * Dto with all parameters to plan a journey.
 */
@ApiExtraModels(JourneyStopStationIdDto, JourneyUserLocationDto)
export class PlanJourneyDto {

  @ApiProperty({
    description: "Location where the journey starts.",
    oneOf: [
      { $ref: getSchemaPath(JourneyStopStationIdDto) },
      { $ref: getSchemaPath(JourneyUserLocationDto) }
    ],
    required: true
  })
  from!: (JourneyStopStationIdDto | JourneyUserLocationDto);

  @ApiProperty({
    description: "Location where the journey ends.",
    oneOf: [
      { $ref: getSchemaPath(JourneyStopStationIdDto) },
      { $ref: getSchemaPath(JourneyUserLocationDto) }
    ],
    required: true
  })
  to!: (JourneyStopStationIdDto | JourneyUserLocationDto);

}
