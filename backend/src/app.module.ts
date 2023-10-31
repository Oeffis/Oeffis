import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { HistoricDataModule } from "historicData/historicData.module";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { StopEntry } from "./historicData/entity/stopEntry.entity";
import { VrrTimetableVersionEntry } from "./historicData/entity/vrrTimetableVersionEntry.entity";
import { JourneyModule } from "./journey/journey.module";
import { LocationFinderModule } from "./locationFinder/locationFinder.module";
import { VrrModule } from "./vrr/vrr.module";

@Module({
  imports: [
    LocationFinderModule,
    JourneyModule,
    VrrModule,
    HistoricDataModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST ?? "localhost",
      port: parseInt(process.env.PG_PORT ?? "5432"),
      username: process.env.PG_USER ?? "postgres",
      password: process.env.PG_PASSWORD ?? "postgres",
      database: process.env.PG_DATABASE ?? "postgres",
      namingStrategy: new SnakeNamingStrategy(),
      entities: [
        DelayEntry,
        StopEntry,
        VrrTimetableVersionEntry
      ]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
