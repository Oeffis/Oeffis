import { ApiProperty } from "@nestjs/swagger";
import { LocationDetails } from "locationFinder/entity/locationDetails.entity";
import { Time } from "./Time.entity";


export class JourneyLocation {

  @ApiProperty({
    description: "Id of the location.",
    type: String
  })
  id?: string;

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  name?: string;

  @ApiProperty({
    description: "Type of the location.",
    type: String
  })
  type?: string;

  @ApiProperty({
    description: "Further details of the location.",
    type: Location,
    required: true
  })
  details!: LocationDetails;

  @ApiProperty({
    description: "Further details of the location.",
    type: Time,
    required: true
  })
  arrival!: Time;

  @ApiProperty({
    description: "Further details of the location.",
    type: Time,
    required: true
  })
  departure!: Time;

  constructor(name: string, id: string, type: string, details: LocationDetails, arrival: Time, departure: Time) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.details = details;
    this.arrival = arrival;
    this.departure = departure;
  }

}

/* 
export interface JourneyLocationElement {
  assignedStops?: AssignedLocation[];
  buildingNumber?: string;
  coord?: Array<any[] | CoordClass | number>;
  disassembledName?: string;
  id?: string;
  infos?: Info[];
  isBest?: boolean;
  isGlobalId?: boolean;
  matchQuality?: number;
  name?: string;
  niveau?: number;
  parent?: Location;
  productClasses?: number[];
  properties?: LocationProperties;
  streetName?: string;
  type?: LocationType;
  arrivalTimeBaseTimetable?: string;
  arrivalTimeEstimated?: string;
  arrivalTimePlanned?: string;
  departureTimeBaseTimetable?: string;
  departureTimeEstimated?: string;
  departureTimePlanned?: string;
  isRealtimeControlled?: boolean;
  [property: string]: any;
} */
