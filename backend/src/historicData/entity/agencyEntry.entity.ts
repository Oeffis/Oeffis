import { IsDefined, IsEmail, IsInstance, IsNotEmpty, IsOptional, IsString, IsTimeZone, IsUrl } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

@Entity("agency")
@Unique((agency: AgencyEntry) => [agency.agencyId, agency.vrrTimetableVersion])
export class AgencyEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly agencyId: string;

  @IsString()
  @IsNotEmpty()
  @Column("text")
  public readonly agencyName: string;

  @IsUrl()
  @Column("text")
  public readonly agencyUrl: string;

  @IsTimeZone()
  @Column("text")
  public readonly agencyTimezone: string;

  @IsString()
  @IsNotEmpty()
  @Column("text")
  public readonly agencyLang: string;

  @IsString()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly agencyPhone?: string;

  @IsUrl()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly agencyFareUrl?: string;

  @IsEmail()
  @IsOptional()
  @Column({ type: "text", nullable: true })
  public readonly agencyEmail?: string;

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
    agencyId: string,
    agencyName: string,
    agencyUrl: string,
    agencyTimezone: string,
    agencyLang: string,
    agencyPhone: string,
    agencyFareUrl: string,
    agencyEmail: string,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>
  ) {

    this.agencyId = agencyId;
    this.agencyName = agencyName;
    this.agencyUrl = agencyUrl;
    this.agencyTimezone = agencyTimezone;
    this.agencyLang = agencyLang;
    this.agencyPhone = agencyPhone;
    this.agencyFareUrl = agencyFareUrl;
    this.agencyEmail = agencyEmail;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
  }
}
