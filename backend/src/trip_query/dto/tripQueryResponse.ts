import { ApiProperty } from "@nestjs/swagger";
import { Trip } from "./trip";

export class TripQueryResponseDto {
  @ApiProperty({
    description: "Trip alternatives found.",
    type: [String],
    required: true
  })
  alternatives!: Trip[];
}
