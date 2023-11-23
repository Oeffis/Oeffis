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
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { StopEntry } from "./stopEntry.entity";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

@Entity("historic_data")
export class DelayEntry {

  @IsInt()
  @IsPositive()
  @PrimaryColumn("bigint")
  public readonly id: bigint;

  /**
   * trip_id syntax here is not identical to syntax in 'trips' table.
   */
  @IsString()
  @IsNotEmpty()
  @Index("historic_data_trip_id_index")
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
  @Index("historic_data_planned_index")
  @Column("timestamp")
  public readonly planned: Date;

  @IsDate()
  @IsOptional()
  @Index("historic_data_estimated_index")
  @Column({ type: "timestamp", nullable: true })
  public readonly estimated?: Date;

  @IsString()
  @IsOptional()
  @Column({ type: "varchar", nullable: true })
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
  @Index("historic_data_trip_code_index")
  @Column("integer")
  public readonly tripCode: number;

  @IsString()
  @Index("historic_data_parent_stop_id_index")
  @Column("text")
  public readonly parentStopId: string;

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
    stop?: Relation<StopEntry>,
    estimated?: Date
  ) {

    this.id = id;
    this.tripId = tripId;
    this.stopId = stopId;
    this.recordingTime = recordingTime;
    this.isDeparture = isDeparture;
    this.planned = planned;
    this.rawData = rawData;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
    this.tripCode = tripCode;
    this.parentStopId = parentStopId;
    this.stop = stop;
    this.estimated = estimated;
  }
}
