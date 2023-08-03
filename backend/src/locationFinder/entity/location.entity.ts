import { ApiProperty } from "@nestjs/swagger";
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
    type: String
  })
  type?: string;

  @ApiProperty({
    description: "Further details of the location.",
    type: LocationDetails,
    required: true
  })
  details!: LocationDetails;

  constructor(name: string, id: string, type: string, details: LocationDetails) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.details = details;
  }

}
