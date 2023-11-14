import { IsBoolean, IsDate, IsDefined, IsInstance, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

@Entity("calendar")
@Unique((calendar: CalendarEntry) => [calendar.serviceId, calendar.vrrTimetableVersion])
export class CalendarEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly serviceId: string;

  @IsBoolean()
  @Column("text")
  public readonly monday: boolean;

  @IsBoolean()
  @Column("text")
  public readonly tuesday: boolean;

  @IsBoolean()
  @Column("text")
  public readonly wednesday: boolean;

  @IsBoolean()
  @Column("text")
  public readonly thursday: boolean;

  @IsBoolean()
  @Column("text")
  public readonly friday: boolean;

  @IsBoolean()
  @Column("text")
  public readonly saturday: boolean;

  @IsBoolean()
  @Column("text")
  public readonly sunday: boolean;

  @IsDate()
  @Column("text")
  public readonly startDate: Date;

  @IsDate()
  @Column("text")
  public readonly endDate: Date;

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
    serviceId: string,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
    startDate: Date,
    endDate: Date,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>
  ) {

    this.serviceId = serviceId;
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
    this.friday = friday;
    this.saturday = saturday;
    this.sunday = sunday;
    this.startDate = startDate;
    this.endDate = endDate;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
  }
}
