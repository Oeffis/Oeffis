import { ApiProperty } from "@nestjs/swagger";
import { IsInstance } from "class-validator";
import { Location } from "locationFinder/entity/location.entity";
import { LocationDetails } from "locationFinder/entity/locationDetails.entity";
import { LocationType } from "vrr/entity/locationType.entity";
import { Time } from "./time.entity";

export class JourneyLocation extends Location {

  @IsInstance(Time)
  @ApiProperty({
    description: "Arrival time.",
    type: Time,
    required: true
  })
  arrival!: Time;

  @IsInstance(Time)
  @ApiProperty({
    description: "Departure time.",
    type: Time,
    required: true
  })
  departure!: Time;

  constructor(name: string, id: string, type: LocationType, details: LocationDetails, arrival: Time, departure: Time) {
    super(name, id, type, details);
    this.arrival = arrival;
    this.departure = departure;
  }

}
