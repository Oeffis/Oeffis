import { ApiProperty } from "@nestjs/swagger";
import { LocationType } from "../../vrr/entity/locationType.entity";
import { LocationDetails } from "./locationDetails.entity";

export class Location {

  @ApiProperty({
    description: "Id of the location.",
    type: String
  })
  id?: string;

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  name?: string;

  @ApiProperty({
    description: "Type of the location.",
    enum: LocationType
  })
  type?: LocationType;

  @ApiProperty({
    description: "Further details of the location.",
    type: LocationDetails,
    required: true
  })
  details!: LocationDetails;

  constructor(name: string, id: string, type: LocationType, details: LocationDetails) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.details = details;
  }
}
