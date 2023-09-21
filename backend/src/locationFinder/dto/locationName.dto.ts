import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsPositive, IsString } from "class-validator";

export class LocationNameDto {

  @IsString()
  @ApiProperty({
    description: "Name of the location to search.",
    type: String,
    required: true,
    example: "Gelsen"
  })
  name!: string;

  @IsPositive()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Limit of the number of results.",
    type: Number,
    example: 5
  })
  limit?: number;

}
