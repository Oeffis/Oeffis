import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInstance, IsOptional } from "class-validator";
import { Leg } from "./leg.entity";

export class Journey {

  @IsArray()
  @IsInstance(Leg, { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: "Legs of a journey.",
    type: [Leg]
  })
  legs?: Leg[];

  constructor(legs: Leg[]) {
    this.legs = legs;
  }

}
