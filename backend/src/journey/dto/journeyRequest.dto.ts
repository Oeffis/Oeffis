import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class JourneyRequestDto {

  @IsNotEmpty()
  @ApiProperty({
    description: "Origin (id) of the trip.",
    type: String,
    required: true,
    example: "de:05513:5613"
  })
  originId!: string;

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
  @IsOptional()
  @ApiPropertyOptional({
    description: "Use departure date as arrival.",
    type: Boolean,
    default: false,
    example: false
  })
  asArrival?: boolean;

}
