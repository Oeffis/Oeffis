import { Module } from "@nestjs/common";
import { JourneyModule } from "./journey/journey.module";
import { LocationFinderModule } from "./locationFinder/locationFinder.module";
import { VrrModule } from "./vrr/vrr.module";

@Module({
  imports: [LocationFinderModule, JourneyModule, VrrModule],
  controllers: [],
  providers: []
})
export class AppModule { }
