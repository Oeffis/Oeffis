import { ApiProperty } from "@nestjs/swagger";
import { Trip } from "./trip.entity";

export class Transportation {

  @ApiProperty({
    description: "Name of transportation vehicle.",
    type: String,
    required: true
  })
  name?: string;

  @ApiProperty({
    description: "Trips depending on this transportation.",
    type: [Trip],
    required: true
  })
  trips?: Trip[];

  constructor(name: string, trips: Trip[]) {
    this.name = name;
    this.trips = trips;
  }

}
