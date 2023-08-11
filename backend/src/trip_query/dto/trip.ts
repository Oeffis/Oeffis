import { ApiProperty } from "@nestjs/swagger";
import { Location } from "locationFinder/entity/location.entity";

export class TripQualityInfos {

  @ApiProperty({
    description: "Number of interchanges on trip.",
    type: Number,
    required: true
  })
  interchanges!: number;

  @ApiProperty({
    description: "Score of the trip.",
    type: Number,
    required: true
  })
  score!: number; // TODO Not used for now.

}

export class Transportation {

  @ApiProperty({
    description: "The line of the transportation.",
    type: String,
    required: true
  })
  line!: string;

  @ApiProperty({
    description: "Full Name of the transportation.",
    type: String,
    required: true
  })
  fullName!: string;

  @ApiProperty({
    description: "Destination of the transportation (name).",
    type: String,
    required: true
  })
  destination!: string;

}

export class TripLegDetails {

  @ApiProperty({
    description: "Hint(s) about the leg.",
    type: [String]
  })
  hints?: string[];

  // TODO Further information like stopSequence?

}

export class TripLeg {

  @ApiProperty({
    description: "Origin stop of the leg.",
    type: Location,
    required: true
  })
  origin!: Location;

  @ApiProperty({
    description: "Destination stop of the leg.",
    type: Location,
    required: true
  })
  destination!: Location;

  @ApiProperty({
    description: "Transportation that is used by the leg.",
    type: Transportation,
    required: true
  })
  transportation!: Transportation;

  @ApiProperty({
    description: "Further details about the trip leg.",
    type: TripLegDetails,
    required: true
  })
  details!: TripLegDetails;

}

export class Trip {

  @ApiProperty({
    description: "Legs of the alternative.",
    type: [TripLeg],
    required: true
  })
  legs!: TripLeg[];

  @ApiProperty({
    description: "Quality information about the trip.",
    type: TripQualityInfos,
    required: true
  })
  qualityInfos!: TripQualityInfos;

}
