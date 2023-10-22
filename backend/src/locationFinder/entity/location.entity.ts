import { ApiExtraModels, ApiProperty, OmitType } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInstance, IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { Rateable } from "../../interfaces/rateable.interface";
import { LocationType } from "../../vrr/entity/locationType.entity";
import { LocationDetails, ParentLocationDetails } from "./locationDetails.entity";

export class Location {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Id of the location.",
    type: String,
    required: true,
    example: "de:05513:5613"
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String,
    required: true,
    example: "Gelsenkirchen, Hbf"
  })
  name: string;

  @IsEnum(LocationType)
  @ApiProperty({
    description: "Type of the location.",
    enum: LocationType,
    required: true,
    example: LocationType.stop
  })
  type: LocationType;

  @IsInstance(LocationDetails)
  @ApiProperty({
    description: "Further details of the location.",
    type: LocationDetails,
    required: true
  })
  details: LocationDetails;

  constructor(
    id: string,
    name: string,
    type: LocationType,
    details: LocationDetails) {

    this.id = id;
    this.name = name;
    this.type = type;
    this.details = details;
  }
}

/**
 * Special type of location, that is used for locations' parent. It does not include any details.
 */
export class ParentLocation extends OmitType(Location, ["details"] as const) {

  @IsInstance(ParentLocationDetails)
  @ApiProperty({
    description: "Further details of the parent location.",
    type: ParentLocationDetails,
    required: true
  })
  details: ParentLocationDetails;

  constructor(
    id: string,
    name: string,
    type: LocationType,
    details: ParentLocationDetails
  ) {

    super(id, name, type);
    this.details = details;
  }
}

/**
 * Special type of location, that includes a rating describing the quality of the result.
 */
@ApiExtraModels(Location)
export class RatedLocation extends Location implements Rateable {

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: "How well the location result meets the query (positive integers including zero, higher means better).",
    type: Number,
    required: true,
    example: 805
  })
  rating: number;

  constructor(
    name: string,
    id: string,
    type: LocationType,
    details: LocationDetails,
    rating: number) {

    super(id, name, type, details);
    this.rating = rating;
  }
}

/**
 * Special type of location, that features locations being assigned to itself.
 */
@ApiExtraModels(Location)
export class LocationWithAssignedStops extends Location {

  @IsArray()
  @IsInstance(RatedLocation, { each: true })
  @ApiProperty({
    description: "All stops assigned to the location.",
    type: [RatedLocation],
    required: true
  })
  assignedStops: RatedLocation[];

  constructor(
    id: string,
    name: string,
    type: LocationType,
    details: LocationDetails,
    assignedStops: RatedLocation[]) {

    super(id, name, type, details);
    this.assignedStops = assignedStops;
  }
}
