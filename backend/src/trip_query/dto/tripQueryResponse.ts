import { ApiProperty } from "@nestjs/swagger";
import { Trip } from "./trip";

export class TripQueryResponseDto {
  @ApiProperty({
    description: "Trip alternatives found.",
    type: [Trip],
    required: true
  })
  alternatives!: Trip[];
}
