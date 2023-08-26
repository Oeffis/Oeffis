import { ApiProperty } from "@nestjs/swagger";
import { Trip } from "./trip.entity";


export class Transportation {

  @ApiProperty({
    description: "Name of transportation vehicle.",
    type: String,
    required: true
  })
  name?: string;

  @ApiProperty({
    description: "Trips depending on this transportation.",
    type: [Trip],
    required: true
  })
  trips!: Trip[];

  constructor(name: string, trips: Trip[]) {
    this.name = name;
    this.trips = trips;
  }

}

/*

export interface Transportation {
    allCoords?: Array<Array<Array<any[] | CoordClass | number>>>;
    assignedStop?: string;
    assignedStopId?: string;
    coords?: Array<Array<Array<any[] | CoordClass | number>>>;
    description?: string;
    destination?: Location;
    disassembledName?: string;
    id?: string;
    index?: string;
    localitySequence?: Location[];
    locationSequence?: JourneyLocationElement[];
    name?: string;
    number?: string;
    operator?: OperatorObject;
    origin?: Location;
    product?: Product;
    properties?: LineProperties;
    trips?: TransportationTrip[];
}



*/
