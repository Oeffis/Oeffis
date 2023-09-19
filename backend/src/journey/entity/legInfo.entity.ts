import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class LegInfo {

  @IsNotEmpty()
  @IsOptional()
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
