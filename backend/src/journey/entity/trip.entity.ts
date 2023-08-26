import { ApiProperty } from "@nestjs/swagger";

export class Trip {

  @ApiProperty({
    description: "Planned arrival time at destination.",
    type: String
  })
  arrivalTimePlannedJourneyDestination?: string;

  @ApiProperty({
    description: "Planned departure time at Origin.",
    type: String
  })
  departureTimePlannedJourneyOrigin?: string;

  @ApiProperty({
    description: "Status information about trip.",
    type: String
  })
  status?: string;

  @ApiProperty({
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

/* export interface TransportationTrip {
  arrivalTimePlannedJourneyDestination?: string;
  departureTimePlannedJourneyOrigin?: string;
  status?: Status;
  trainNumber?: string;
  trainType?: any;
  tripCode: number;
}  */
