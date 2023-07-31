import { ApiProperty } from "@nestjs/swagger";

export class Stop {
  @ApiProperty({
    description: "Id of the stop.",
    type: String
  })
  id!: string;

  @ApiProperty({
    description: "Name of the stop.",
    type: String
  })
  name!: string;

  @ApiProperty({
    description: "Latitude of the stop.",
    type: Number
  })
  latitude!: number;

  @ApiProperty({
    description: "Longitude of the stop.",
    type: Number
  })
  longitude!: number;

  constructor(name: string, id: string, latitude: number, longitude: number) {
    this.name = name;
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export class StopFinderResponseDto {
  @ApiProperty({
    description: "Stops found.",
    type: [String],
    required: true
  })
  stops!: Stop[];
}
