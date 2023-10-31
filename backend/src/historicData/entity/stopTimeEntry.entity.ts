import { IsDefined, IsEnum, IsInstance, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { StopEntry } from "./stopEntry.entity";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

// See https://gtfs.org/schedule/reference/#stop_timestxt.
export enum StopTimePickupDropOffType {
  regular = "0",
  none = "1",
  phoneAgency = "2",
  coordinateWithDriver = "3"
}

@Entity("stop_times")
@Unique((stopTime: StopTimeEntry) =>
  [stopTime.tripId, stopTime.arrivalTime, stopTime.departureTime, stopTime.stop])
export class StopTimeEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly tripId: string; // As DB does not have a foreign key here, entity does not either.

  /**
   * Can contain times like "24:12:00" if a service exceeds midnight.
   */
  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly arrivalTime: string;

  /**
   * Can contain times like "24:12:00" if a service exceeds midnight.
   */
  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly departureTime: string;

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly stopId: string;

  @IsInstance(StopEntry)
  @IsDefined()
  @ManyToOne(() => StopEntry, { eager: true })
  @JoinColumn([
    { name: "stop_id", referencedColumnName: "stopId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly stop: Relation<StopEntry>;

  @IsInt()
  @Min(0)
  @Column("text")
  public readonly stopSequence: string;

  @IsString()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly stopHeadsign?: string;

  @IsEnum(StopTimePickupDropOffType)
  @Column({ type: "enum", enum: StopTimePickupDropOffType })
  public readonly pickupType: StopTimePickupDropOffType;

  @IsEnum(StopTimePickupDropOffType)
  @Column({ type: "enum", enum: StopTimePickupDropOffType, nullable: true })
  public readonly dropOffType: StopTimePickupDropOffType;

  @IsNumber()
  @Min(0.0)
  @Column({ type: "text", nullable: true })
  public readonly shapeDistTraveled?: string;

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
    arrivalTime: string,
    departureTime: string,
    stopId: string,
    stop: Relation<StopEntry>,
    stopSequence: string,
    pickupType: StopTimePickupDropOffType,
    dropOffType: StopTimePickupDropOffType,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>,
    stopHeadsign?: string,
    shapeDistTraveled?: string
  ) {

    this.tripId = tripId;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.stopId = stopId;
    this.stop = stop;
    this.stopSequence = stopSequence;
    this.pickupType = pickupType;
    this.dropOffType = dropOffType;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
    this.stopHeadsign = stopHeadsign;
    this.shapeDistTraveled = shapeDistTraveled;
  }
}
