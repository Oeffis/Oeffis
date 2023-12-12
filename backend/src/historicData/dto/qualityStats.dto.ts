import { Equals } from "class-validator";
import { MaybeStats } from "./maybeStats.dto";

export class QualityStats extends MaybeStats {

  @Equals("available")
  public readonly status: string = "available";

  // TODO

}
