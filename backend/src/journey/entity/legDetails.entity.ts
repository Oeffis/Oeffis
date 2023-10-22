import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInstance, IsInt, IsOptional, Min } from "class-validator";
import { LocationCoordinates } from "../../locationFinder/entity/locationCoordinates.entity";
import { JourneyLocation } from "./journeyLocation.entity";
import { LegInfo } from "./legInfo.entity";
import { LegInterchange } from "./legInterchange.entity";

/**
 * Details of journey leg.
 */
export class LegDetails {

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: "Duration of leg in seconds.",
    type: Number,
    required: true,
    example: 480
  })
  duration: number;

  @IsArray()
  @IsInstance(LegInfo, { each: true })
  @ApiProperty({
    description: "Information like restrictions regarding this specifically dated leg (can be empty).",
    type: [LegInfo],
    required: true
  })
  infos: LegInfo[];

  @IsArray()
  @IsInstance(JourneyLocation, { each: true })
  @ApiProperty({
    description: "All stops that are part of this leg (origin to destination including intermediate stops).",
    type: [JourneyLocation],
    required: true
  })
  stopSequence: JourneyLocation[];

  @IsInstance(LegInterchange)
  @IsOptional()
  @ApiPropertyOptional({
    description: "Interchange to next leg that takes place at the end of this leg.",
    type: LegInterchange
  })
  interchange?: LegInterchange;

  @IsArray()
  @IsInstance(LocationCoordinates, { each: true })
  @ApiProperty({
    description: "Coordinates that are describing the route this leg takes.",
    type: [LocationCoordinates],
    required: true
  })
  coords: LocationCoordinates[];

  constructor(
    duration: number,
    infos: LegInfo[],
    stopSequence: JourneyLocation[],
    coords: LocationCoordinates[],
    interchange?: LegInterchange) {

    this.duration = duration;
    this.infos = infos;
    this.stopSequence = stopSequence;
    this.coords = coords;
    this.interchange = interchange;
  }
}
