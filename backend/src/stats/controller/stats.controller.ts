import { Controller, Get } from "@nestjs/common";
import { StatsService } from "stats/service/stats.service";

@Controller("stats")
export class StatsController {
  public constructor(
    private readonly statsService: StatsService
  ) { }

  @Get("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getStats(): Promise<any> {
    return this.statsService.getStats();
  }
}
