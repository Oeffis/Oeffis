import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInstance, IsNotEmpty, IsOptional } from "class-validator";
import { Trip } from "./trip.entity";

export class Transportation {

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Name of transportation vehicle.",
    type: String,
    example: "Regionalbahn 46"
  })
  name?: string;

  @IsArray()
  @IsInstance(Trip, { each: true })
  @IsOptional()
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
