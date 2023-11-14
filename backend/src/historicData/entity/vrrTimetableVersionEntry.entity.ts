import { IsDate, IsInt, IsPositive } from "class-validator";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity("vrr_timetable_version")
export class VrrTimetableVersionEntry {

  @IsInt()
  @IsPositive()
  @Index("vrr_timetable_version_id_idx", { unique: true })
  @PrimaryColumn({ type: "integer", generated: "identity" })
  public readonly vrrTimetableVersionId: number;

  @IsDate()
  @Column({ type: "timestamp with time zone", default: new Date(Date.now()) })
  public readonly importTimestamp: Date;

  public constructor(
    vrrTimetableVersionId: number,
    importTimestamp: Date
  ) {

    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.importTimestamp = importTimestamp;
  }
}
