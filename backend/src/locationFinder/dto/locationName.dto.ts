import { ApiProperty } from "@nestjs/swagger";

export class LocationNameDto {

  @ApiProperty({
    description: "Name of the location to search.",
    type: String,
    required: true,
    example: "Gelsen"
  })
  name!: string;
}
