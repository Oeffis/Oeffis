import { ApiProperty } from "@nestjs/swagger";
import { Leg } from "./Leg.entity";

export class Journey {

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  legs?: Leg[];

  constructor(legs: Leg[]) {
    this.legs = legs;
  }

}


/* export interface TRIPSchema {
  error?: Error;
  journeys?: Journey[];
  properties?: any;
  serverInfo?: ServerInfo;
  systemMessages?: SystemMessage[];
  taxiOperators?: TaxiOperator[];
  version: string;
}
export interface Journey {
  booking?: Booking[];
  fare?: JourneyFare;
  interchanges?: number;
  isAdditional?: boolean;
  isRealtimeOnlyInformative?: boolean;
  legs?: Leg[];
  rating?: number;
} */
