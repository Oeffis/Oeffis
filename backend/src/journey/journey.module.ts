import { Module } from "@nestjs/common";
import { LocationFinderModule } from "../locationFinder/locationFinder.module";
import { VrrModule } from "../vrr/vrr.module";
import { JourneyController } from "./controller/journey.controller";
import { JourneyService } from "./service/journey.service";
import { VrrJourneysWrapperService } from "./service/vrrJourneysWrapper.service";

@Module({
  providers: [JourneyService, VrrJourneysWrapperService],
  controllers: [JourneyController],
  imports: [VrrModule, LocationFinderModule]
})
export class JourneyModule {

}
