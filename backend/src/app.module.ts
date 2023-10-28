import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { HistoricDataModule } from "historicData/historicData.module";
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
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [
        DelayEntry
      ]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
