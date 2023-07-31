import { ApiProperty } from "@nestjs/swagger";

export class StopFinderByNameParametersDto {
  @ApiProperty({
    description: "Latitude of the location to search.",
    type: Number,
    required: true,
    example: "Gelsen"
  })
  name!: string;
}

export class StopFinderByNameResponseDto {
  @ApiProperty({
    description: "Stops found.",
    type: [String],
    required: true
  })
  stops!: string[];
}
