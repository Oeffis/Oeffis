import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoricDataController } from "./controller/historicDataController";
import { DelayEntry } from "./entity/delayEntry.entity";
import { HistoricDataService } from "./service/historicData.service";

@Module({
  providers: [HistoricDataService],
  controllers: [HistoricDataController],
  imports: [TypeOrmModule.forFeature([DelayEntry])]
})
export class HistoricDataModule { }
