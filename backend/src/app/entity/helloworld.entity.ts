import { ApiProperty } from "@nestjs/swagger";

export class HelloWorld {
  @ApiProperty()
  message: string;
}
