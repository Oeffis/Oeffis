import { ApiProperty } from "@nestjs/swagger";
import { Leg } from "./leg.entity";

export class Journey {

  @ApiProperty({
    description: "Legs of a journey.",
    type: [Leg]
  })
  legs?: Leg[];

  constructor(legs: Leg[]) {
    this.legs = legs;
  }

}
