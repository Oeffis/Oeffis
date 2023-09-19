import { ApiPropertyOptional } from "@nestjs/swagger";
import { Leg } from "./leg.entity";

export class Journey {

  @ApiPropertyOptional({
    description: "Legs of a journey.",
    type: [Leg]
  })
  legs?: Leg[];

  constructor(legs: Leg[]) {
    this.legs = legs;
  }

}
