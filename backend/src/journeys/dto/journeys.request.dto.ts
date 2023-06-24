import { ApiProperty } from "@nestjs/swagger";

/**
 * Dto to create a journey request with ids.
 */
export class JourneysRequestDto {

  @ApiProperty({
    description: "Where the journey starts (id).",
    required: true
  })
  from!: string;

  @ApiProperty({
    description: "Where the journey ends (id).",
    required: true
  })
  to!: string;

}
