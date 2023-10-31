import {
  IsDefined,
  IsEnum,
  IsInstance,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl
} from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

// See https://gtfs.org/schedule/reference/#stopstxt.
export enum StopLocationType {
  stopOrPlatform = "0",
  station = "1",
  entranceOrExit = "2",
  genericNode = "3",
  boardingArea = "4"
}

// See https://gtfs.org/schedule/reference/#tripstxt and https://gtfs.org/schedule/reference/#stopstxt.
export enum WheelchairSupport {
  noInformation = "0",
  partiallySupported = "1",
  notSupported = "2"
}

@Entity("stops")
@Unique((stop: StopEntry) => [stop.stopId, stop.vrrTimetableVersion])
export class StopEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly stopId: string;

  @IsString()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly stopCode?: string;

  @IsString()
  @IsNotEmpty()
  @Column("text")
  public readonly stopName: string;

  @IsLatitude()
  @Column("text")
  public readonly stopLat: string;

  @IsLongitude()
  @Column("text")
  public readonly stopLon: string;

  @IsUrl()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly stopUrl?: string;

  @IsEnum(StopLocationType)
  @IsOptional()
  @Column({ type: "enum", enum: StopLocationType, nullable: true })
  public readonly locationType?: StopLocationType;

  @IsString()
  @IsOptional()
  @Column({ name: "parent_station", type: "text", nullable: true })
  public readonly parentStationId?: string;

  @IsInstance(StopEntry)
  @IsOptional()
  @ManyToOne(() => StopEntry, { lazy: true, nullable: true })
  @JoinColumn([
    { name: "parent_station", referencedColumnName: "stopId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly parentStation?: Promise<StopEntry>;

  @IsEnum(WheelchairSupport)
  @IsOptional()
  @Column({ type: "enum", enum: WheelchairSupport, nullable: true })
  public readonly wheelchairBoarding?: WheelchairSupport;

  @IsString()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly platformCode?: string;

  @IsString()
  @IsOptional()
  @Column({ name: "NVBW_HST_DHID", type: "text", nullable: true })
  public readonly nvbwHstDhid?: string;

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
    stopId: string,
    stopName: string,
    stopLat: string,
    stopLon: string,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>,
    stopCode?: string,
    stopUrl?: string,
    locationType?: StopLocationType,
    parentStationId?: string,
    parentStation?: Promise<StopEntry>,
    wheelchairBoarding?: WheelchairSupport,
    platformCode?: string,
    nvbwHstDhid?: string
  ) {

    this.stopId = stopId;
    this.stopName = stopName;
    this.stopLat = stopLat;
    this.stopLon = stopLon;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
    this.stopCode = stopCode;
    this.stopUrl = stopUrl;
    this.locationType = locationType;
    this.parentStationId = parentStationId;
    this.parentStation = parentStation;
    this.wheelchairBoarding = wheelchairBoarding;
    this.platformCode = platformCode;
    this.nvbwHstDhid = nvbwHstDhid;
  }
}
