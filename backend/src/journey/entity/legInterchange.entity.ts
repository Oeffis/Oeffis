import { ApiProperty } from "@nestjs/swagger";
import { IsInstance } from "class-validator";
import { Footpath } from "../../footpath/entity/footpath.entity";

export class LegInterchange {

  @IsInstance(Footpath)
  @ApiProperty({
    description: "Details about the interchange footpath.",
    type: Footpath,
    required: true
  })
  footpath: Footpath;

  constructor(footpath: Footpath) {
    this.footpath = footpath;
  }
}
