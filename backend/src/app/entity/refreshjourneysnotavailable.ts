import { ApiProperty } from "@nestjs/swagger";

export class RefreshJourneyNotAvailable {

  @ApiProperty({
    description: "Http status code",
    example: 405,
  })
  statusCode = 405;

  @ApiProperty({
    description: "Error message",
    example: "Refresh journey not available.",
  })
  message = "Refresh journey not available.";

}
