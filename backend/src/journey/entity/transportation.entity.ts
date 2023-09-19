import { ApiPropertyOptional } from "@nestjs/swagger";
import { Trip } from "./trip.entity";

export class Transportation {

  @ApiPropertyOptional({
    description: "Name of transportation vehicle.",
    type: String,
    example: "Regionalbahn 46"
  })
  name?: string;

  @ApiPropertyOptional({
    description: "Trips depending on this transportation.",
    type: [Trip]
  })
  trips?: Trip[];

  constructor(name: string, trips: Trip[]) {
    this.name = name;
    this.trips = trips;
  }

}
