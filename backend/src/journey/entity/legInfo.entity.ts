import { ApiProperty } from "@nestjs/swagger";

export class LegInfo {

  @ApiProperty({
    description: "Leg origin",
    type: String
  })
  content?: string;

  constructor(content: string) {
    this.content = content;
  }
}
