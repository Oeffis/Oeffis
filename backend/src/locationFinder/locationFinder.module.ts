import { Module } from "@nestjs/common";
import { LocationFinderController } from "./controller/locationFinder.controller";
import { LocationFinderService } from "./service/locationFinder.service";

@Module({
  controllers: [LocationFinderController],
  providers: [LocationFinderService]
})
export class LocationFinderModule {}
