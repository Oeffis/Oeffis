import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsArray, IsInstance, IsNotEmpty, IsString } from "class-validator";
import { Location } from "../../locationFinder/entity/location.entity";
import { LocationType } from "../../vrr/entity/locationType.entity";

/**
 * Destination location of transportation vehicle.
 */
export class TransportationDestination extends OmitType(Location, ["details"] as const) {}

export class Transportation {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Id of transportation vehicle.",
    type: String,
    required: true,
    example: "ddb:90E43: :R:j23"
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Name of transportation vehicle.",
    type: String,
    required: true,
    example: "Regionalzug RB43"
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Line (number) or short name of transportation vehicle.",
    type: String,
    required: true,
    example: "RB43"
  })
  line: string;

  @IsInstance(TransportationDestination)
  @ApiProperty({
    description: "Destination of transportation vehicle (id is no globalId mostly!).",
    type: TransportationDestination,
    required: true,
    example: {
      id: "20003868",
      name: "Dorsten Bf",
      type: LocationType.stop
    }
  })
  destination: TransportationDestination;

  @IsString()
  @ApiProperty({
    description: "Operator of transportation vehicle (name). Can be empty string, if none is given.",
    type: String,
    required: true,
    example: "DB Regio AG NRW"
  })
  operator: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: "Hints about the specific transportation vehicle. Can be empty.",
    type: [String],
    required: true,
    example: [
      "Linie RB43: Fahrradmitnahme begrenzt möglich",
      "Linie RB43: Fahrzeuggebundene Einstiegshilfe vorhanden",
      "Linie RB43: rollstuhltaugliches WC"
    ]
  })
  hints: string[];

  constructor(
    id: string,
    name: string,
    line: string,
    destination: TransportationDestination,
    operator: string,
    hints: string[]) {

    this.id = id;
    this.name = name;
    this.line = line;
    this.destination = destination;
    this.operator = operator;
    this.hints = hints;
  }
}
