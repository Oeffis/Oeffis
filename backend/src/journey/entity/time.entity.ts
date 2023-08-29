import { ApiProperty } from "@nestjs/swagger";

export class Time {

  @ApiProperty({
    description: "Time estimated.",
    type: Date
  })
  estimated?: Date;

  @ApiProperty({
    description: "Time planned.",
    type: Date
  })
  planned?: Date;

  constructor(estimated: Date, planned: Date) {
    this.estimated = estimated;
    this.planned = planned;
  }

}
