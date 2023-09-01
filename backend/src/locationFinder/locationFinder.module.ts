import { Module } from "@nestjs/common";
import { VrrModule } from "../vrr/vrr.module";
import { LocationFinderController } from "./controller/locationFinder.controller";
import { LocationFinderService } from "./service/locationFinder.service";
import { VrrLocationWrapperService } from "./service/vrrLocationWrapper.service";

@Module({
  controllers: [LocationFinderController],
  providers: [LocationFinderService, VrrLocationWrapperService],
  imports: [VrrModule],
  exports: [VrrLocationWrapperService]
})
export class LocationFinderModule { }
