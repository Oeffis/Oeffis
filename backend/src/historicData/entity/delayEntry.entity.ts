import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsInstance,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString
} from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { StopEntry } from "./stopEntry.entity";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

@Entity("historic_data")
export class DelayEntry {

  @IsInt()
  @IsPositive()
  @PrimaryColumn("integer")
  public readonly id: number;

  /**
   * trip_id syntax here is not identical to syntax in 'trips' table.
   */
  @IsString()
  @IsNotEmpty()
  @Column("text")
  public readonly tripId: string;

  @IsString()
  @IsNotEmpty()
  @Column("text")
  public readonly stopId: string;

  /**
   * There are some cases where given stop_id cannot be found in vrr timetable data.
   */
  @IsInstance(StopEntry)
  @IsOptional()
  @ManyToOne(() => StopEntry, { eager: true, nullable: true })
  @JoinColumn([
    { name: "stop_id", referencedColumnName: "stopId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly stop?: Relation<StopEntry>;

  @IsDate()
  @Column("timestamp")
  public readonly recordingTime: Date;

  @IsBoolean()
  @Column("boolean")
  public readonly isDeparture: boolean;

  @IsDate()
  @Column("timestamp")
  public readonly planned: Date;

  @IsDate()
  @IsOptional()
  @Column({ type: "timestamp", nullable: true })
  public readonly estimated?: Date;

  @IsString()
  @IsOptional()
  @Column("varchar")
  public readonly rawData?: string;

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

  @IsInt()
  @Column("integer")
  public readonly tripCode: number;

  public constructor(
    id: number,
    tripId: string,
    stopId: string,
    recordingTime: Date,
    isDeparture: boolean,
    planned: Date,
    rawData: string,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>,
    tripCode: number,
    stop?: Relation<StopEntry>,
    estimated?: Date
  ) {

    this.id = id;
    this.tripId = tripId;
    this.stopId = stopId;
    this.stop = stop;
    this.recordingTime = recordingTime;
    this.isDeparture = isDeparture;
    this.planned = planned;
    this.rawData = rawData;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
    this.tripCode = tripCode;
    this.estimated = estimated;
  }
}
