import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsEnum } from "class-validator";

export class MaybeStats {
  @ApiProperty({
    description: "Status of the leg stats.",
    type: String,
    enum: ["available", "unavailable"],
    required: true,
    example: "available"
  })
  public readonly status: string;

  public constructor(
    status: string
  ) {
    this.status = status;
  }
}

export enum UnavailableReason {
  noData = "NO_DATA",
  internalError = "QUERY_ERROR"
}

export class UnavailableStats extends MaybeStats {
  @Equals("unavailable")
  public readonly status: string = "unavailable";

  @IsEnum(UnavailableReason)
  @ApiProperty({
    description: "The reason, why the data is not available",
    type: String,
    required: true,
    example: UnavailableReason.noData
  })
  reason: UnavailableReason;

  public constructor(reason: UnavailableReason) {
    super("unavailable");
    this.reason = reason;
  }
}
