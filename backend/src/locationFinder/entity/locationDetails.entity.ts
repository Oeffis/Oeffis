import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInstance, IsString } from "class-validator";
import { ParentLocation } from "./location.entity";
import { LocationCoordinates } from "./locationCoordinates.entity";

/**
 * Details of a location. Fields that are not primarily relevant to identify one location.
 */
export class LocationDetails {

  @IsString()
  @ApiProperty({
    description: "Short name of the location. Can be empty string.",
    type: String,
    required: true,
    example: "Hbf"
  })
  shortName: string;

  @IsInstance(LocationCoordinates)
  @ApiProperty({
    description: "Coordinates of the location.",
    type: LocationCoordinates,
    required: true
  })
  coordinates: LocationCoordinates;

  @IsInstance(ParentLocation)
  @ApiProperty({
    description: "Parent of this location.",
    type: () => ParentLocation,
    required: true,
    example: {
      id: "placeID:5513000:9",
      name: "Gelsenkirchen",
      type: "locality"
    }
  })
  parent: ParentLocation;

  constructor(
    shortName: string,
    coordinates: LocationCoordinates,
    parent: ParentLocation) {

    this.shortName = shortName;
    this.parent = parent;
    this.coordinates = coordinates;
  }
}

/**
 * Special type of location details, that is used for location parents. Fields are all optional.
 */
export class ParentLocationDetails extends PartialType(LocationDetails) {}
