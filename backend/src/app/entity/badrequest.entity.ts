import { ApiProperty } from "@nestjs/swagger";

export class BadRequest {
  @ApiProperty({
    description: "Http status code",
    example: 400,
  })
    statusCode = 400;
  @ApiProperty({
    description: "Error message",
    example: "Bad request.",
  })
    message = "Bad Request.";
}
