import { ApiProperty } from "@nestjs/swagger";

export class Trip {

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  arrivalTimePlannedJourneyDestination?: string;

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  departureTimePlannedJourneyOrigin?: string;

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  status?: string;

  @ApiProperty({
    description: "(Full) Name of the location.",
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
