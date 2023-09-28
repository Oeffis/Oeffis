import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsInt, Min } from "class-validator";
import { FootpathLeg, TransportationLeg } from "./leg.entity";

@ApiExtraModels(TransportationLeg, FootpathLeg)
export class Journey {

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: "Number of interchanges contained in given journey (corresponds to number of legs minus one).",
    type: Number,
    required: true,
    example: 2
  })
  interchanges: number;

  @IsArray()
  // A class validation (IsInstance) is not possible here because of the type guard used.
  @ApiProperty({
    description: "Partial trips/journeys which are forming the journey as a whole.",
    type: "array",
    items: {
      oneOf: [
        { $ref: getSchemaPath(TransportationLeg) },
        { $ref: getSchemaPath(FootpathLeg) }
      ],
      discriminator: {
        propertyName: "type",
        mapping: {
          "transportation": getSchemaPath(TransportationLeg),
          "footpath": getSchemaPath(FootpathLeg)
        }
      }
    },
    required: true
  })
  legs: (TransportationLeg | FootpathLeg)[];

  constructor(
    interchanges: number,
    legs: (TransportationLeg | FootpathLeg)[]) {

    this.interchanges = interchanges;
    this.legs = legs;
  }
}
