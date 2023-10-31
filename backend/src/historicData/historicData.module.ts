import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoricDataController } from "./controller/historicDataController";
import { DelayEntry } from "./entity/delayEntry.entity";
import { StopEntry } from "./entity/stopEntry.entity";
import { VrrTimetableVersionEntry } from "./entity/vrrTimetableVersionEntry.entity";
import { HistoricDataService } from "./service/historicData.service";

@Module({
  providers: [HistoricDataService],
  controllers: [HistoricDataController],
  imports: [TypeOrmModule.forFeature([
    DelayEntry,
    StopEntry,
    VrrTimetableVersionEntry
  ])]
})
export class HistoricDataModule { }
