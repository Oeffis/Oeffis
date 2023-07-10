import { ApiProperty } from "@nestjs/swagger";

/**
 * Dto representing a hafas stop or station by its ID.
 */
export class JourneyStopStationIdDto {

  @ApiProperty({
    description: "ID of a hafas stop or station.",
    type: String,
    required: true
  })
  stopStationId!: string;

}

/**
 * Dto representing a user location.
 */
export class JourneyUserLocationDto {

  @ApiProperty({
    description: "(Full) address of the location specified by latitude and longitude.",
    type: String,
    required: true
  })
  address!: string;

  @ApiProperty({
    description: "Latitude of the user location.",
    type: Number,
    required: true
  })
  latitude!: number;

  @ApiProperty({
    description: "Longitude of the user location.",
    type: Number,
    required: true
  })
  longitude!: number;

}
