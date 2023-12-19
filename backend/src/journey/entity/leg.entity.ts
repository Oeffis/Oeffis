import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsInstance } from "class-validator";
import { LegStats } from "historicData/dto/legStats.dto";
import { Footpath } from "../../footpath/entity/footpath.entity";
import { LegDestinationLocation, LegOriginLocation } from "./journeyLocation.entity";
import { LegDetails } from "./legDetails.entity";
import { Transportation } from "./transportation.entity";

export enum LegType {
  transportation = "transportation",
  footpath = "footpath"
}

/**
 * Base definition of a leg that is included in any special-typed leg.
 */
class Leg {

  @IsInstance(LegOriginLocation)
  @ApiProperty({
    description: "Origin location of the leg.",
    type: LegOriginLocation,
    required: true
  })
  origin: LegOriginLocation;

  @IsInstance(LegDestinationLocation)
  @ApiProperty({
    description: "Destination location of the leg.",
    type: LegDestinationLocation,
    required: true
  })
  destination: LegDestinationLocation;

  @IsInstance(LegDetails)
  @ApiProperty({
    description: "Further details of the leg.",
    type: LegDetails,
    required: true
  })
  details: LegDetails;

  constructor(
    origin: LegOriginLocation,
    destination: LegDestinationLocation,
    details: LegDetails) {

    this.origin = origin;
    this.destination = destination;
    this.details = details;
  }
}

/**
 * Leg that uses a transportation to travel from origin to destination.
 */
export class TransportationLeg extends Leg {

  @Equals(LegType.transportation)
  @ApiProperty({
    description: "Type of the leg.",
    type: String,
    enum: LegType,
    required: true,
    default: LegType.transportation
  })
  type: string = LegType.transportation;

  @IsInstance(Transportation)
  @ApiProperty({
    description: "Transportation that is used in this leg.",
    type: Transportation,
    required: true
  })
  transportation: Transportation;

  @IsInstance(LegStats)
  @ApiProperty({
    description: "Statistics about this leg.",
    type: LegStats,
    required: true
  })
  legStats: LegStats;

  constructor(
    origin: LegOriginLocation,
    destination: LegDestinationLocation,
    details: LegDetails,
    transportation: Transportation,
    legStats: LegStats
  ) {

    super(origin, destination, details);
    this.transportation = transportation;
    this.legStats = legStats;
  }

  public static isTransportationLeg(leg: TransportationLeg | FootpathLeg): leg is TransportationLeg {
    return leg.type === LegType.transportation as string;
  }
}

/**
 * Leg that represents a footpath in a journey.
 */
export class FootpathLeg extends Leg {

  @Equals(LegType.footpath)
  @ApiProperty({
    description: "Type of the leg.",
    type: String,
    enum: LegType,
    required: true,
    default: LegType.footpath
  })
  type: string = LegType.footpath;

  @IsInstance(Footpath)
  @ApiProperty({
    description: "Details about the footpath.",
    type: Footpath,
    required: true
  })
  footpath: Footpath;

  constructor(
    origin: LegOriginLocation,
    destination: LegDestinationLocation,
    details: LegDetails,
    footpath: Footpath) {

    super(origin, destination, details);
    this.footpath = footpath;
  }

  public static isFootpathLeg(leg: TransportationLeg | FootpathLeg): leg is FootpathLeg {
    return leg.type === LegType.footpath as string;
  }
}
