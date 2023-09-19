import { ApiPropertyOptional } from "@nestjs/swagger";

export class LegInfo {

  @ApiPropertyOptional({
    description: "Leg origin",
    type: String,
    example: "Linie RE42: Fahrradmitnahme begrenzt möglich"
  })
  content?: string;

  constructor(content: string) {
    this.content = content;
  }
}
