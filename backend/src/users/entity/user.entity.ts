import { ApiProperty } from "@nestjs/swagger";

export class User {
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
