import { ApiProperty } from "@nestjs/swagger";
import { StopFinderResponseDto } from "./stop";

export class StopFinderByNameParametersDto {
  @ApiProperty({
    description: "Latitude of the location to search.",
    type: String,
    required: true,
    example: "Gelsen"
  })
  name!: string;
}

export class StopFinderByNameResponseDto extends StopFinderResponseDto { }
