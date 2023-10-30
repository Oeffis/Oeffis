import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HistoricDataService } from "historicData/service/historicData.service";

@Controller("/historicData")
@ApiTags("historicData")
export class HistoricDataController {
  constructor(private historicDataService: HistoricDataService) { }

  @Get("/delayEntryCount")
  getDelayEntryCount(): Promise<number> {
    return this.historicDataService.getDelayEntryCount();
  }
}
