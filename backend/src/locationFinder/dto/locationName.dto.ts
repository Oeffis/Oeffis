import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export class LocationNameDto {

  @IsDefined()
  @ApiProperty({
    description: "Name of the location to search.",
    type: String,
    required: true,
    example: "Gelsen"
  })
  name!: string;

  @ApiProperty({
    description: "Limit of the number of results.",
    type: Number,
    required: false,
    example: 5
  })
  limit?: number;

}
