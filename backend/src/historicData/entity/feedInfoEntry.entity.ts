import { IsDate, IsDefined, IsInstance, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

@Entity("feed_info")
@Unique((feedInfo: FeedInfoEntry) => [feedInfo.feedPublisherName, feedInfo.vrrTimetableVersion])
export class FeedInfoEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly feedPublisherName: string;

  @IsUrl()
  @Column("text")
  public readonly feedPublisherUrl: string;

  @IsString()
  @IsNotEmpty()
  @Column("text")
  public readonly feedLang: string;

  @IsDate()
  @Column("text")
  public readonly feedStartDate: string;

  @IsDate()
  @Column("text")
  public readonly feedEndDate: string;

  @IsString()
  @IsNotEmpty()
  @Column("text")
  public readonly feedVersion: string;

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
    feedPublisherName: string,
    feedPublisherUrl: string,
    feedLang: string,
    feedStartDate: string,
    feedEndDate: string,
    feedVersion: string,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>
  ) {

    this.feedPublisherName = feedPublisherName;
    this.feedPublisherUrl = feedPublisherUrl;
    this.feedLang = feedLang;
    this.feedStartDate = feedStartDate;
    this.feedEndDate = feedEndDate;
    this.feedVersion = feedVersion;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
  }
}
