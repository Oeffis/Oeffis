import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class JourneyRequestDto {

  @IsNotEmpty()
  @ApiProperty({
    description: "Origin (id) of the trip.",
    example: "de:05513:5613",
    type: String,
    required: true
  })
  originId!: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Destination (id) of the trip.",
    example: "de:05562:4982",
    type: String,
    required: true
  })
  destinationId!: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: "Date of the trip to start.",
    example: new Date("2023-08-29T16:58:47.129Z"),
    type: Date,
    required: true
  })
  departure!: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Use departure date as arrival.",
    default: false,
    example: false,
    type: Boolean
  })
  asArrival?: boolean;

}
