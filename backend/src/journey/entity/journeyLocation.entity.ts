import { ApiProperty } from "@nestjs/swagger";
import { Location } from "locationFinder/entity/location.entity";
import { LocationDetails } from "locationFinder/entity/locationDetails.entity";
import { Time } from "./time.entity";


export class JourneyLocation extends Location {

  @ApiProperty({
    description: "Arrival time.",
    type: Time,
    required: true
  })
  arrival!: Time;

  @ApiProperty({
    description: "Departure time.",
    type: Time,
    required: true
  })
  departure!: Time;

  constructor(name: string, id: string, type: string, details: LocationDetails, arrival: Time, departure: Time) {
    super(name, id, type, details);
    this.arrival = arrival;
    this.departure = departure;
  }

}
