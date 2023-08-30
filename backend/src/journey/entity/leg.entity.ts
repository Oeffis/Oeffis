import { ApiProperty } from "@nestjs/swagger";
import { JourneyLocation } from "./journeyLocation.entity";
import { LegDetails } from "./legDetails.entity";
import { Transportation } from "./transportation.entity";

export class Leg {

  @ApiProperty({
    description: "Leg origin",
    type: JourneyLocation
  })
  origin?: JourneyLocation;

  @ApiProperty({
    description: "Leg destination.",
    type: JourneyLocation
  })
  destination?: JourneyLocation;

  @ApiProperty({
    description: "Leg transportation.",
    type: Transportation
  })
  transportation?: Transportation;

  @ApiProperty({
    description: "Leg details.",
    type: LegDetails
  })
  details?: LegDetails;

  constructor(origin: JourneyLocation, destination: JourneyLocation, transportation: Transportation, details: LegDetails) {
    this.origin = origin;
    this.destination = destination;
    this.transportation = transportation;
    this.details = details;
  }

}
