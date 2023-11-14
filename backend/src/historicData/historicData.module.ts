import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoricDataController } from "./controller/historicDataController";
import { AgencyEntry } from "./entity/agencyEntry.entity";
import { CalendarDateEntry } from "./entity/calendarDateEntry.entity";
import { CalendarEntry } from "./entity/calendarEntry.entity";
import { DelayEntry } from "./entity/delayEntry.entity";
import { FeedInfoEntry } from "./entity/feedInfoEntry.entity";
import { RouteEntry } from "./entity/routeEntry.entity";
import { ShapeEntry } from "./entity/shapeEntry.entity";
import { StopEntry } from "./entity/stopEntry.entity";
import { StopTimeEntry } from "./entity/stopTimeEntry.entity";
import { TransferEntry } from "./entity/transferEntry.entity";
import { TripEntry } from "./entity/tripEntry.entity";
import { VrrTimetableVersionEntry } from "./entity/vrrTimetableVersionEntry.entity";
import { HistoricDataService } from "./service/historicData.service";

@Module({
  providers: [HistoricDataService],
  controllers: [HistoricDataController],
  imports: [TypeOrmModule.forFeature([
    AgencyEntry,
    CalendarEntry,
    CalendarDateEntry,
    DelayEntry,
    FeedInfoEntry,
    RouteEntry,
    ShapeEntry,
    StopEntry,
    StopTimeEntry,
    TransferEntry,
    TripEntry,
    VrrTimetableVersionEntry
  ])]
})
export class HistoricDataModule { }
