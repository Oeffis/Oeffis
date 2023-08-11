import { ApiProperty } from "@nestjs/swagger";
import { Location } from "./location.entity";

export class LocationDetails {

  @ApiProperty({
    description: "Short name of the location.",
    type: String
  })
  shortName?: string;

  @ApiProperty({
    description: "Quality how well the given location meets the related query (biggest number is the best result).",
    type: Number
  })
  matchQuality?: number;

  @ApiProperty({
    description: "Parent location of this location.",
    type: () => Location
  })
  parent?: Location;

  @ApiProperty({
    description: "Latitude of a location.",
    type: Number
  })
  latitude?: number;

  @ApiProperty({
    description: "Longitude of a location.",
    type: Number
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
