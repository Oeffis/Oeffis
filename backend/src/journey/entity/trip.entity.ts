import { ApiPropertyOptional } from "@nestjs/swagger";

export class Trip {

  @ApiPropertyOptional({
    description: "Planned arrival time at destination.",
    type: String
  })
  arrivalTimePlannedJourneyDestination?: string;

  @ApiPropertyOptional({
    description: "Planned departure time at Origin.",
    type: String
  })
  departureTimePlannedJourneyOrigin?: string;

  @ApiPropertyOptional({
    description: "Status information about trip.",
    type: String
  })
  status?: string;

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
