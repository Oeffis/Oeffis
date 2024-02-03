import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { RouteEntry } from "historicData/entity/routeEntry.entity";
import { StatsController } from "./controller/stats.controller";
import { StatsService } from "./service/stats.service";

@Module({
  providers: [StatsService],
  controllers: [StatsController],
  imports: [TypeOrmModule.forFeature([
    DelayEntry,
    RouteEntry
  ])]
})
export class StatsModule { }
