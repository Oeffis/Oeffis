import { ApiProperty } from "@nestjs/swagger";
import { RouteEntry } from "historicData/entity/routeEntry.entity";

export type WithDelay<T> = T & { delay: number };
export type WithRoute<T> = T & { route: RouteEntry };

export class WorstDelayEntry {
  // @ApiProperty({
  //   description: "The name of the route start",
  //   type: String,
  //   required: true
  // })
  // routeStart: string = "";

  // @ApiProperty({
  //   description: "The name of the route end",
  //   type: String,
  //   required: true
  // })
  // routeEnd: string = "";

  // @ApiProperty({
  //   description: "The reference to the route",
  //   type: String,
  //   required: true
  // })
  // routeRef: string = "";

  @ApiProperty({
    description: "The short name of the route",
    type: String,
    required: true
  })
  routeShortName: string = "";

  @ApiProperty({
    description: "The long name of the route",
    type: String,
    required: true
  })
  routeLongName: string = "";

  @ApiProperty({
    description: "The id to the route",
    type: String,
    required: true
  })
  routeId: string = "";

  @ApiProperty({
    description: "The delay",
    type: Number,
    required: true
  })
  delay: number = 0;

  @ApiProperty({
    description: "The planned time",
    type: Date,
    required: true
  })
  planned: Date = new Date();

  @ApiProperty({
    description: "The estimated time",
    type: Date,
    required: true
  })
  estimated: Date = new Date();
}

export class Stats {
  @ApiProperty({
    description: "Whether the stats are filled.",
    type: Boolean,
    required: true
  })
  filled: boolean = false;

  @ApiProperty({
    description: "When the stats were last updated.",
    type: Date,
    required: true
  })
  time: Date = new Date();

  @ApiProperty({
    description: "The most delayed trips",
    type: [WorstDelayEntry],
    required: true
  })
  delays: WorstDelayEntry[] = [];
}
