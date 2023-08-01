import { ApiProperty } from "@nestjs/swagger";

export class TripQueryRequestDto {
  @ApiProperty({
    description: "Origin of the trip.",
    type: String,
    required: true
  })
  origin!: string;

  @ApiProperty({
    description: "Destination of the trip.",
    type: String,
    required: true
  })
  destination!: string;

  @ApiProperty({
    description: "Date of the trip.",
    type: String,
    required: true
  })
  departure?: string;
}
