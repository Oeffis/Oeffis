import { ApiProperty } from "@nestjs/swagger";

export class LegDetails {

  @ApiProperty({
    description: "Parent location of this location.",
    type: Number
  })
  distance?: number;

  @ApiProperty({
    description: "Parent location of this location.",
    type: Number
  })
  duration?: number;

  @ApiProperty({
    description: "Parent location of this location.",
    type: String
  })
  infos?: string; // Info[]

  @ApiProperty({
    description: "Latitude of a location.",
    type: String
  })
  hints?: string; // Info[]

  @ApiProperty({
    description: "Quality how well the given location meets the related query (biggest number is the best result).",
    type: String
  })
  realtimeStatus?: string; // RealtimeTripStatus

  constructor(distance: number, duration: number, infos: string, hints: string, realtimeStatus: string) {
    this.distance = distance;
    this.duration = duration;
    this.infos = infos;
    this.hints = hints;
    this.realtimeStatus = realtimeStatus;
  }

}


/* 
export interface Leg {
    coords?: Array<Array<any[] | CoordClass | number>>;
    destination?: JourneyLocationElement;
    distance?: number;
    duration?: number;
    elevationSummary?: ElevationSummary;
    fare?: LegFare;
    footPathInfo?: Array<any[] | boolean | FootPathInfoClass | number | number | null | string>;
    hints?: Info[];
    infos?: Info[];
    interchange?: Interchange;
    isRealtimeControlled?: boolean;
    origin?: JourneyLocationElement;
    pathDescriptions?: Array<any[] | boolean | PathDescriptionClass | number | number | null | string>;
    properties?: any[] | boolean | number | number | null | FluffyProperties | string;
    realtimeStatus?: RealtimeTripStatus[];
    stopSequence?: JourneyLocationElement[];
    transportation?: Transportation;
    vehicleAccess?: string[] | string;
}
*/
