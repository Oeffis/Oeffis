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
}
