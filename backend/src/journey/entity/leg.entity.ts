import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInstance, IsOptional } from "class-validator";
import { JourneyLocation } from "./journeyLocation.entity";
import { LegDetails } from "./legDetails.entity";
import { Transportation } from "./transportation.entity";

export class Leg {

  @IsInstance(JourneyLocation)
  @IsOptional()
  @ApiPropertyOptional({
    description: "Leg origin",
    type: JourneyLocation
  })
  origin?: JourneyLocation;

  @IsInstance(JourneyLocation)
  @IsOptional()
  @ApiPropertyOptional({
    description: "Leg destination.",
    type: JourneyLocation
  })
  destination?: JourneyLocation;

  @IsInstance(Transportation)
  @IsOptional()
  @ApiPropertyOptional({
    description: "Leg transportation.",
    type: Transportation
  })
  transportation?: Transportation;

  @IsInstance(LegDetails)
  @ApiProperty({
    description: "Leg details.",
    type: LegDetails,
    required: true
  })
  details!: LegDetails;

  constructor(origin: JourneyLocation, destination: JourneyLocation, transportation: Transportation, details: LegDetails) {
    this.origin = origin;
    this.destination = destination;
    this.transportation = transportation;
    this.details = details;
  }

}
