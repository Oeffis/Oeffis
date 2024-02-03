import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { HistoricDataModule } from "historicData/historicData.module";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AgencyEntry } from "./historicData/entity/agencyEntry.entity";
import { CalendarDateEntry } from "./historicData/entity/calendarDateEntry.entity";
import { CalendarEntry } from "./historicData/entity/calendarEntry.entity";
import { FeedInfoEntry } from "./historicData/entity/feedInfoEntry.entity";
import { RouteEntry } from "./historicData/entity/routeEntry.entity";
import { ShapeEntry } from "./historicData/entity/shapeEntry.entity";
import { StopEntry } from "./historicData/entity/stopEntry.entity";
import { StopTimeEntry } from "./historicData/entity/stopTimeEntry.entity";
import { TransferEntry } from "./historicData/entity/transferEntry.entity";
import { TripEntry } from "./historicData/entity/tripEntry.entity";
import { VrrTimetableVersionEntry } from "./historicData/entity/vrrTimetableVersionEntry.entity";
import { JourneyModule } from "./journey/journey.module";
import { LocationFinderModule } from "./locationFinder/locationFinder.module";
import { StatsModule } from "./stats/stats.module";
import { VrrModule } from "./vrr/vrr.module";

@Module({
  imports: [
    LocationFinderModule,
    JourneyModule,
    VrrModule,
    HistoricDataModule,
    StatsModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST ?? "localhost",
      port: parseInt(process.env.PG_PORT ?? "5432"),
      username: process.env.PG_USER ?? "postgres",
      password: process.env.PG_PASSWORD ?? "postgres",
      database: process.env.PG_DATABASE ?? "postgres",
      namingStrategy: new SnakeNamingStrategy(),

      entities: [
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
      ]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
