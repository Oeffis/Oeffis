import { ApiProperty } from "@nestjs/swagger";

export class Time {

  @ApiProperty({
    description: "Time base.",
    type: String
  })
  timeBaseTimetable?: string;

  @ApiProperty({
    description: "Time estimated.",
    type: String
  })
  timeEstimated?: string;

  @ApiProperty({
    description: "Time planned.",
    type: String
  })
  timePlanned?: string;


  constructor(timeBaseTimetable: string, timeEstimated: string, timePlanned: string) {
    this.timeBaseTimetable = timeBaseTimetable;
    this.timeEstimated = timeEstimated;
    this.timePlanned = timePlanned;
  }

}
