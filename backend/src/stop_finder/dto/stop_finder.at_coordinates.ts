import { ApiProperty } from "@nestjs/swagger";

export class StopFinderAtCoordinatesParametersDto {

  @ApiProperty({
    description: "Latitude of the location to search.",
    type: Number,
    required: true,
    example: 51.50598042775682
  })
    latitude!: number;

  @ApiProperty({
    description: "Longitude of the location to search.",
    type: Number,
    required: true,
    example: 7.101082448485377
  })
    longitude!: number;
}

export class StopFinderAtCoordinatesResponseDto {
  @ApiProperty({
    description: "Locations found.",
    type: [String],
    required: true
  })
    stops!: string[];
}
