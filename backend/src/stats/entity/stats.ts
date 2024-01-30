import { ApiProperty } from "@nestjs/swagger";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { RouteEntry } from "historicData/entity/routeEntry.entity";
import { StopEntry } from "historicData/entity/stopEntry.entity";
import { VrrTimetableVersionEntry } from "historicData/entity/vrrTimetableVersionEntry.entity";
import { Relation } from "typeorm";

export type WithDelay<T> = T & { delay: number };
export type WithRoute<T> = T & { route: RouteEntry };

export class DelayWithRoute extends DelayEntry {
  @ApiProperty({
    description: "Route this delay entry is associated with.",
    type: RouteEntry
  })
  route: RouteEntry;

  public constructor(
    id: bigint,
    tripId: string,
    stopId: string,
    recordingTime: Date,
    isDeparture: boolean,
    planned: Date,
    rawData: string,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>,
    tripCode: number,
    parentStopId: string,
    routeEntry: RouteEntry,
    stop?: Relation<StopEntry>,
    estimated?: Date,
  ) {
    super(
      id,
      tripId,
      stopId,
      recordingTime,
      isDeparture,
      planned,
      rawData,
      vrrTimetableVersionId,
      vrrTimetableVersion,
      tripCode,
      parentStopId,
      stop,
      estimated
    );
    this.route = routeEntry;
  }
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
    type: [DelayWithRoute],
    required: true
  })
  delays: DelayWithRoute[] = [];
}
