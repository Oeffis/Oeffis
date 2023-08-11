import { ApiProperty } from "@nestjs/swagger";

export class Time {

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  timeBaseTimetable?: string;

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  timeEstimated?: string;

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  timePlanned?: string;


  constructor(timeBaseTimetable: string, timeEstimated: string, timePlanned: string) {
    this.timeBaseTimetable = timeBaseTimetable;
    this.timeEstimated = timeEstimated;
    this.timePlanned = timePlanned;
  }

}
