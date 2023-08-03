import { ApiProperty } from "@nestjs/swagger";

export class TripQueryRequestDto {

  @ApiProperty({
    description: "Origin (id) of the trip.",
    type: String,
    required: true
  })
  originId!: string; // TODO Is this working with location input?

  @ApiProperty({
    description: "Destination (id) of the trip.",
    type: String,
    required: true
  })
  destinationId!: string;

  @ApiProperty({
    description: "Date of the trip to start (default: current date).",
    type: Date
  })
  departure?: Date;

  @ApiProperty({
    description: "Use departure date as arrival.",
    default: false,
    type: Boolean
  })
  asArrival?: boolean;

}
