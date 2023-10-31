import { IsDate, IsDefined, IsEnum, IsInstance, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

// See https://gtfs.org/schedule/reference/#calendar_datestxt.
export enum CalendarDateExceptionType {
  serviceAdded = "1",
  serviceRemoved = "2"
}

@Entity("calendar_dates")
@Unique((calendarDate: CalendarDateEntry) =>
  [calendarDate.serviceId, calendarDate.date, calendarDate.vrrTimetableVersion])
export class CalendarDateEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly serviceId: string;

  @IsDate()
  @PrimaryColumn("text")
  public readonly date: string;

  @IsEnum(CalendarDateExceptionType)
  @IsDefined()
  @Column({ type: "enum", enum: CalendarDateExceptionType })
  public readonly exceptionType: CalendarDateExceptionType;

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
    date: string,
    exceptionType: CalendarDateExceptionType,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>
  ) {

    this.serviceId = serviceId;
    this.date = date;
    this.exceptionType = exceptionType;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
  }
}
