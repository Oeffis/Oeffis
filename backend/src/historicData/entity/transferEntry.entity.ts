import { IsDefined, IsEnum, IsInstance, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { StopEntry } from "./stopEntry.entity";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

// See https://gtfs.org/schedule/reference/#transferstxt.
export enum TransferType {
  recommended = "0",
  timedWait = "1",
  minTransferTime = "2",
  notPossible = "3",
  sameVehicle = "4",
  alightAndReboard = "5"
}

@Entity("transfers")
@Unique((transfer: TransferEntry) =>
  [transfer.fromStop, transfer.toStop, transfer.vrrTimetableVersion])
export class TransferEntry {

  @IsInstance(StopEntry)
  @IsDefined()
  @ManyToOne(() => StopEntry, { eager: true })
  @JoinColumn([
    { name: "from_stop_id", referencedColumnName: "stopId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly fromStop: Relation<StopEntry>;

  @IsInstance(StopEntry)
  @IsDefined()
  @ManyToOne(() => StopEntry, { eager: true })
  @JoinColumn([
    { name: "to_stop_id", referencedColumnName: "stopId" },
    { name: "vrr_timetable_version_id", referencedColumnName: "vrrTimetableVersionId" }
  ])
  public readonly toStop: Relation<StopEntry>;

  @IsEnum(TransferType)
  @Column({ type: "enum", enum: TransferType })
  public readonly transferType: TransferType;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly minTransferTime?: string;

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
    fromStop: StopEntry,
    toStop: StopEntry,
    transferType: TransferType,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>,
    minTransferTime?: string
  ) {

    this.fromStop = fromStop;
    this.toStop = toStop;
    this.transferType = transferType;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
    this.minTransferTime = minTransferTime;
  }
}
