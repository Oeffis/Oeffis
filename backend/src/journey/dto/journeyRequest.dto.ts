import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class JourneyRequestDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Origin (id) of the trip.",
    type: String,
    required: true,
    example: "de:05513:5613"
  })
  originId!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Destination (id) of the trip.",
    type: String,
    required: true,
    example: "de:05562:4982"
  })
  destinationId!: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: "Date of the trip to start.",
    type: Date,
    required: true,
    example: new Date("2023-12-01T11:30:00.000Z")
  })
  departure!: Date;

  @IsBoolean()
  @ApiProperty({
    description: "Use departure date as arrival.",
    type: Boolean,
    required: true,
    example: false
  })
  asArrival!: boolean;

}
