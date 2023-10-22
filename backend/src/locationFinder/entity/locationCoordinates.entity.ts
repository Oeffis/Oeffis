import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsLongitude } from "class-validator";

export class LocationCoordinates {

  @IsLatitude()
  @ApiProperty({
    description: "Latitude of the location.",
    type: Number,
    required: true,
    example: 51.50598042775682
  })
  latitude: number;

  @IsLongitude()
  @ApiProperty({
    description: "Longitude of the location.",
    type: Number,
    required: true,
    example: 7.101082448485377
  })
  longitude: number;

  constructor(
    latitude: number,
    longitude: number) {

    this.latitude = latitude;
    this.longitude = longitude;
  }
}
