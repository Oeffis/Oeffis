import { IsDefined, IsEnum, IsHexColor, IsInstance, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { AgencyEntry } from "./agencyEntry.entity";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

// See https://gtfs.org/schedule/reference/#routestxt.
export enum RouteType {
  lightRailOrStreetLevel = "0",
  underground = "1",
  rail = "2",
  bus = "3",
  ferry = "4",
  cableTram = "5",
  cableTransport = "6",
  funicular = "7",
  trolleybus = "11",
  monorail = "12"
}

@Entity("routes")
@Unique((route: RouteEntry) => [route.routeId, route.vrrTimetableVersion])
export class RouteEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly routeId: string;

  @IsInstance(AgencyEntry)
  @IsDefined()
  @ManyToOne(() => AgencyEntry, { eager: true })
  @JoinColumn([
    { name: "agency_id", referencedColumnName: "agencyId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly agency: Relation<AgencyEntry>;

  @IsString()
  @IsNotEmpty()
  @Column("text")
  public readonly routeShortName: string;

  @IsString()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly routeLongName?: string;

  @IsEnum(RouteType)
  @Column({ type: "enum", enum: RouteType })
  public readonly routeType: RouteType;

  @IsHexColor()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly routeColor?: string;

  @IsHexColor()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly routeTextColor?: string;

  @IsString()
  @IsOptional()
  @Column({ name: "NVBW_DLID", type: "text", nullable: true })
  public readonly nvbwDlid?: string;

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
    routeId: string,
    agency: Relation<AgencyEntry>,
    routeShortName: string,
    routeType: RouteType,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>,
    routeLongName?: string,
    routeColor?: string,
    routeTextColor?: string,
    nvbwDlid?: string
  ) {

    this.routeId = routeId;
    this.agency = agency;
    this.routeShortName = routeShortName;
    this.routeType = routeType;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
    this.routeLongName = routeLongName;
    this.routeColor = routeColor;
    this.routeTextColor = routeTextColor;
    this.nvbwDlid = nvbwDlid;
  }
}
