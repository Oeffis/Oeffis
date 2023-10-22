import { Module } from "@nestjs/common";
import { LocationFinderModule } from "locationFinder/locationFinder.module";
import { VrrModule } from "vrr/vrr.module";
import { FootpathModule } from "../footpath/footpath.module";
import { JourneyController } from "./controller/journey.controller";
import { JourneyService } from "./service/journey.service";
import { JourneyMapperService } from "./service/mapper/journeyMapper.service";

@Module({
  providers: [JourneyService, JourneyMapperService],
  controllers: [JourneyController],
  imports: [VrrModule, LocationFinderModule, FootpathModule]
})
export class JourneyModule {

}
