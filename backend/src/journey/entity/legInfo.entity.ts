import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEnum, IsInstance, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { LegInfoPriority } from "../../vrr/entity/legInfoPriority.entity";

/**
 * In which period of time the leg information is valid.
 */
export class LegInfoValidity {

  @IsDate()
  @ApiProperty({
    description: "From which date on leg information becomes valid.",
    type: Date,
    required: true,
    example: new Date("2023-10-01T00:00:00.000Z")
  })
  from: Date;

  @IsDate()
  @ApiProperty({
    description: "From which date on leg information is not valid any more. " +
      "Sometimes a date far away in the future is used to state that there is no end date known yet.",
    type: Date,
    required: true,
    example: new Date("2023-10-12T23:59:00.000Z")
  })
  to: Date;

  constructor(
    from: Date,
    to: Date) {

    this.from = from;
    this.to = to;
  }
}

/**
 * Information like restrictions regarding a specifically dated leg.
 */
export class LegInfo {

  @IsEnum(LegInfoPriority)
  @ApiProperty({
    description: "Priority of information.",
    enum: LegInfoPriority,
    required: true,
    example: LegInfoPriority.normal
  })
  priority: LegInfoPriority;

  @IsInstance(LegInfoValidity)
  @ApiProperty({
    description: "In which period of time the leg information is valid.",
    type: LegInfoValidity,
    required: true
  })
  validity: LegInfoValidity;

  @IsString()
  @ApiProperty({
    description: "Title of information. Empty string if there is none.",
    type: String,
    required: true,
    example: "Haltestellenausfälle durch Baumaßnahme"
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Content of information (can be formatted with HTML)",
    type: String,
    required: true,
    example: "<b>Linien 253, 253E und TB253: </b>An der <b>(H) Gladbeck, Paul-Löbe-Str.</b> kommt es zu " +
      "<b>Haltestellenausfällen</b>.<br><br> Dauer: Bis auf Weiteres<br><br>Die Haltestellen werden nicht angefahren." +
      "Die (H) „Paul-Löbe-Straße“, (H) „Enfieldstraße“, (H) Theodor-Heuss-Straße und (H) „Gustav-Stresemannstraße“. " +
      "Alternativhaltestellen: (H) „Hegestraße“ und Ersatz-(H) Haltestelle auf der Fritz-Erler-Straße.<br><br> " +
      "Die beschriebenen Änderungen sind in der elektronischen Fahrplanauskunft (EFA) <b>nicht</b> berücksichtigt."
  })
  content: string;

  @IsUrl()
  @ApiProperty({
    description: "URL that supplies given content.",
    type: String,
    required: true,
    example: "http://ems.vrr.de/info-link/3d6d3916-d219-5c50-8bd2-e7c5184eb1cc"
  })
  sourceUrl: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @ApiProperty({
    description: "Additional links supplying further information. Can be empty if there are none.",
    type: [String],
    required: true,
    example: [
      "https://www.zuginfo.nrw/download/1694062491251_1693576007350_Plakat.pdf",
      "https://www.zuginfo.nrw/download/1694062491297_1693576007385_Fahrplan.pdf"
    ]
  })
  additionalLinks: string[];

  constructor(
    priority: LegInfoPriority,
    validity: LegInfoValidity,
    title: string,
    content: string,
    sourceUrl: string,
    additionalLinks: string[]) {

    this.priority = priority;
    this.validity = validity;
    this.title = title;
    this.content = content;
    this.sourceUrl = sourceUrl;
    this.additionalLinks = additionalLinks;
  }
}
