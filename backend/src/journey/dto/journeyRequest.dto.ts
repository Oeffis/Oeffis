import { ApiProperty } from "@nestjs/swagger";

export class JourneyRequestDto {

  @ApiProperty({
    description: "Origin (id) of the trip.",
    example: "de:05513:5613",
    type: String,
    required: true
  })
  originId!: string;

  @ApiProperty({
    description: "Destination (id) of the trip.",
    example: "de:05562:4982",
    type: String,
    required: true
  })
  destinationId!: string;

  @ApiProperty({
    description: "Date of the trip to start (default: current date).",
    example: new Date("2023-08-29T16:58:47.129Z"),
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
