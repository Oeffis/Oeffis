import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsInstance, IsLatitude, IsLongitude, IsNumber, IsOptional } from "class-validator";
import { Location } from "./location.entity";

export class LocationDetails {

  @IsDefined()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Short name of the location.",
    type: String,
    example: "Hbf"
  })
  shortName?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Quality how well the given location meets the related query (biggest number is the best result).",
    type: Number,
    example: 805
  })
  matchQuality?: number;

  @IsInstance(Location)
  @IsOptional()
  @ApiPropertyOptional({
    description: "Parent location of this location.",
    type: () => Location,
    example: {
      id: "placeID:5513000:9",
      name: "Gelsenkirchen",
      type: "locality"
    }
  })
  parent?: Location;

  @IsLatitude()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Latitude of the location.",
    type: Number,
    example: 51.50493
  })
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Longitude of the location.",
    type: Number,
    example: 7.10221
  })
  longitude?: number;

  constructor(shortName: string, matchQuality: number, parent: Location, latitude: number, longitude: number) {
    this.shortName = shortName;
    this.parent = parent;
    this.matchQuality = matchQuality;
    this.latitude = latitude;
    this.longitude = longitude;
  }

}
