import { IsDefined, IsEnum, IsInstance, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { CalendarEntry } from "./calendarEntry.entity";
import { RouteEntry } from "./routeEntry.entity";
import { ShapeEntry } from "./shapeEntry.entity";
import { WheelchairSupport } from "./stopEntry.entity";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

// See https://gtfs.org/schedule/reference/#tripstxt.
export enum DirectionId {
  oneDirection = "0",
  oppositeDirection = "1"
}

@Entity("trips")
@Unique((trip: TripEntry) => [trip.tripId, trip.vrrTimetableVersion])
export class TripEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly tripId: string;

  @IsInstance(RouteEntry)
  @IsDefined()
  @ManyToOne(() => RouteEntry, { eager: true })
  @JoinColumn([
    { name: "route_id", referencedColumnName: "routeId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly route: Relation<RouteEntry>;

  @IsInstance(CalendarEntry)
  @IsDefined()
  @ManyToOne(() => CalendarEntry, { eager: true })
  @JoinColumn([
    { name: "service_id", referencedColumnName: "serviceId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly service: Relation<CalendarEntry>;

  @IsInstance(ShapeEntry)
  @IsOptional()
  @ManyToOne(() => ShapeEntry, { eager: true, nullable: true })
  @JoinColumn([
    { name: "shape_id", referencedColumnName: "shapeId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly shape?: Relation<ShapeEntry>;

  @IsString()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly tripHeadsign?: string;

  @IsString()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly tripShortName?: string;

  @IsEnum(DirectionId)
  @Column({ type: "enum", enum: DirectionId })
  public readonly directionId: DirectionId;

  @IsEnum(WheelchairSupport)
  @Column({ type: "enum", enum: WheelchairSupport })
  public readonly wheelchairAccessible: WheelchairSupport;

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly vrrTimetableVersionId: string;

  @IsInstance(VrrTimetableVersionEntry)
  @IsDefined()
  @ManyToOne(() => VrrTimetableVersionEntry, { eager: true })
  @JoinColumn([
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly vrrTimetableVersion: Relation<VrrTimetableVersionEntry>;

  public constructor(
    tripId: string,
    route: Relation<RouteEntry>,
    service: Relation<CalendarEntry>,
    directionId: DirectionId,
    wheelchairAccessible: WheelchairSupport,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>,
    shape?: Relation<ShapeEntry>,
    tripHeadsign?: string,
    tripShortName?: string
  ) {

    this.tripId = tripId;
    this.route = route;
    this.service = service;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
    this.shape = shape;
    this.tripHeadsign = tripHeadsign;
    this.tripShortName = tripShortName;
    this.directionId = directionId;
    this.wheelchairAccessible = wheelchairAccessible;
  }
}
