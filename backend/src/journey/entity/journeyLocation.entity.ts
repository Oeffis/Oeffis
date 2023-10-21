import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { Location } from "locationFinder/entity/location.entity";
import { LocationDetails } from "locationFinder/entity/locationDetails.entity";
import { LocationType } from "vrr/entity/locationType.entity";

/**
 * Special type of location that includes planned arrival and departure time.
 */
export class JourneyLocation extends Location {

  @IsDate()
  @ApiProperty({
    description: "Planned arrival time. If there is no specific arrival time, departure time gets duplicated.",
    type: Date,
    required: true,
    example: new Date("2023-08-29T16:58:00.000Z")
  })
  arrivalTimePlanned: Date;

  @IsDate()
  @ApiProperty({
    description: "Planned departure time. If there is no specific departure time, arrival time gets duplicated.",
    type: Date,
    required: true,
    example: new Date("2023-08-29T17:02:00.000Z")
  })
  departureTimePlanned: Date;

  constructor(
    id: string,
    name: string,
    type: LocationType,
    details: LocationDetails,
    arrivalTimePlanned: Date,
    departureTimePlanned: Date) {

    super(id, name, type, details);
    this.arrivalTimePlanned = arrivalTimePlanned;
    this.departureTimePlanned = departureTimePlanned;
  }
}

/**
 * Journey location that also includes estimated arrival and departure time.
 */
class JourneyLocationWithEstimates extends JourneyLocation {

  @IsDate()
  @ApiProperty({
    description: "Estimated arrival time. " +
      "If there is no estimated arrival time, planned arrival time gets duplicated.",
    type: Date,
    required: true,
    example: new Date("2023-08-29T16:59:30.000Z")
  })
  arrivalTimeEstimated: Date;

  @IsDate()
  @ApiProperty({
    description: "Estimated departure time. " +
      "If there is no estimated departure time, planned departure time gets duplicated.",
    type: Date,
    required: true,
    example: new Date("2023-08-29T17:02:00.000Z")
  })
  departureTimeEstimated: Date;

  constructor(
    id: string,
    name: string,
    type: LocationType,
    details: LocationDetails,
    arrivalTimePlanned: Date,
    departureTimePlanned: Date,
    arrivalTimeEstimated: Date,
    departureTimeEstimated: Date) {

    super(id, name, type, details, arrivalTimePlanned, departureTimePlanned);
    this.arrivalTimeEstimated = arrivalTimeEstimated;
    this.departureTimeEstimated = departureTimeEstimated;
  }
}

/**
 * Origin location of a leg which includes departure times only.
 */
export class LegOriginLocation
  extends OmitType(JourneyLocationWithEstimates, ["arrivalTimePlanned", "arrivalTimeEstimated"] as const) {}

/**
 * Destination location of a leg which includes arrival times only.
 */
export class LegDestinationLocation
  extends OmitType(JourneyLocationWithEstimates, ["departureTimePlanned", "departureTimeEstimated"] as const) {}
