import { ApiProperty } from "@nestjs/swagger";

export class UserNotFound {
    @ApiProperty({
      description: "Http status code",
      example: 404
    })
      statusCode = 400;
    @ApiProperty({
      description: "Error message",
      example: "User not found."
    })
      message = "User not found.";
}
