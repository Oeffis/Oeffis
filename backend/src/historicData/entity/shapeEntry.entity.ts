import {
  IsDefined,
  IsInstance,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min
} from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation, Unique } from "typeorm";
import { VrrTimetableVersionEntry } from "./vrrTimetableVersionEntry.entity";

@Entity("shapes")
@Unique((shape: ShapeEntry) => [shape.shapeId, shape.vrrTimetableVersion])
export class ShapeEntry {

  @IsString()
  @IsNotEmpty()
  @PrimaryColumn("text")
  public readonly shapeId: string;

  @IsLatitude()
  @Column("text")
  public readonly shapePtLat: string;

  @IsLongitude()
  @Column("text")
  public readonly shapePtLon: string;

  @IsInt()
  @Min(0)
  @Column("text")
  public readonly shapePtSequence: string;

  @IsNumber()
  @Min(0.0)
  @Column("text")
  public readonly shapeDistTraveled: string;

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
    shapeId: string,
    shapePtLat: string,
    shapePtLon: string,
    shapePtSequence: string,
    shapeDistTraveled: string,
    vrrTimetableVersionId: string,
    vrrTimetableVersion: Relation<VrrTimetableVersionEntry>
  ) {

    this.shapeId = shapeId;
    this.shapePtLat = shapePtLat;
    this.shapePtLon = shapePtLon;
    this.shapePtSequence = shapePtSequence;
    this.shapeDistTraveled = shapeDistTraveled;
    this.vrrTimetableVersionId = vrrTimetableVersionId;
    this.vrrTimetableVersion = vrrTimetableVersion;
  }
}
