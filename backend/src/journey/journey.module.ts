import { Module } from "@nestjs/common";
import { HistoricDataModule } from "historicData/historicData.module";
import { LocationFinderModule } from "locationFinder/locationFinder.module";
import { VrrModule } from "vrr/vrr.module";
import { FootpathModule } from "../footpath/footpath.module";
import { JourneyController } from "./controller/journey.controller";
import { JourneyService } from "./service/journey.service";
import { JourneyLocationMapperService } from "./service/mapper/journeyLocationMapper.service";
import { JourneyMapperService } from "./service/mapper/journeyMapper.service";
import { JourneyStatsFactoryService } from "./service/mapper/journeyStatsFactory.service";
import { LegDetailsMapperService } from "./service/mapper/legDetailsMapper.service";
import { TransportationMapperService } from "./service/mapper/transportationMapper.service";

@Module({
  providers: [JourneyService, TransportationMapperService, JourneyLocationMapperService,
    JourneyStatsFactoryService, LegDetailsMapperService, JourneyMapperService],
  controllers: [JourneyController],
  imports: [VrrModule, LocationFinderModule, FootpathModule, HistoricDataModule]
})
export class JourneyModule {

}
