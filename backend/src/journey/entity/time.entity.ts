import { ApiPropertyOptional } from "@nestjs/swagger";

export class Time {

  @ApiPropertyOptional({
    description: "Time estimated.",
    type: Date,
    example: new Date("2023-08-29T16:58:00.000Z")
  })
  estimated?: Date;

  @ApiPropertyOptional({
    description: "Time planned.",
    type: Date,
    example: new Date("2023-08-29T17:23:00.000Z")
  })
  planned?: Date;

  constructor(estimated: Date, planned: Date) {
    this.estimated = estimated;
    this.planned = planned;
  }

}
