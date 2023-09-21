import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInstance, IsNotEmpty, IsOptional } from "class-validator";
import { LocationType } from "../../vrr/entity/locationType.entity";
import { LocationDetails } from "./locationDetails.entity";

export class Location {

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Id of the location.",
    type: String,
    example: "de:05513:5613"
  })
  id?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    description: "(Full) Name of the location.",
    type: String,
    example: "Gelsenkirchen, Hbf"
  })
  name?: string;

  @IsEnum(LocationType)
  @IsOptional()
  @ApiPropertyOptional({
    description: "Type of the location.",
    enum: LocationType,
    example: LocationType.stop
  })
  type?: LocationType;

  @IsInstance(LocationDetails)
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
