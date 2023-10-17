import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class Trip {

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Planned arrival time at destination.",
    type: String
  })
  arrivalTimePlannedJourneyDestination?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Planned departure time at Origin.",
    type: String
  })
  departureTimePlannedJourneyOrigin?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Status information about trip.",
    type: String
  })
  status?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Train number.",
    type: String
  })
  trainNumber?: string;

  constructor(arrivalTimePlannedJourneyDestination: string, departureTimePlannedJourneyOrigin: string, status: string, trainNumber: string) {
    this.arrivalTimePlannedJourneyDestination = arrivalTimePlannedJourneyDestination;
    this.departureTimePlannedJourneyOrigin = departureTimePlannedJourneyOrigin;
    this.status = status;
    this.trainNumber = trainNumber;
  }

}
