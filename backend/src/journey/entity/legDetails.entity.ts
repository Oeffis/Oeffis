import { ApiProperty } from "@nestjs/swagger";

export class LegDetails {

  @ApiProperty({
    description: "Distance.",
    type: Number
  })
  distance?: number;

  @ApiProperty({
    description: "Duration.",
    type: Number
  })
  duration?: number;

  @ApiProperty({
    description: "Leg information.",
    type: String
  })
  infos?: string; // Info[]

  @ApiProperty({
    description: "Leg hints.",
    type: String
  })
  hints?: string; // Info[]

  @ApiProperty({
    description: "Leg real time status.",
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
