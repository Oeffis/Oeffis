import { ApiProperty } from "@nestjs/swagger";
import { StopFinderResponseDto } from "./stop";

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

export class StopFinderAtCoordinatesResponseDto extends StopFinderResponseDto { }
