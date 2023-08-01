import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
  @ApiProperty({
    description: "Name of a User",
    example: "John Smith"
  })
    name!: string;
  @ApiProperty({
    description: "Age of a User",
    example: 45
  })
    age!: number;
  @ApiProperty({
    description: "City of a User",
    example: "New York"
  })
    city!: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
