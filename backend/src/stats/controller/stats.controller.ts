import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Stats } from "stats/entity/stats";
import { StatsService } from "stats/service/stats.service";

@Controller("stats")
@ApiTags("stats")
export class StatsController {
  public constructor(
    private readonly statsService: StatsService
  ) { }

  @Get("")
  @ApiOkResponse({
    description: "Stats.",
    type: Stats
  })
  public async getStats(): Promise<Stats> {
    return this.statsService.getStats();
  }
}
