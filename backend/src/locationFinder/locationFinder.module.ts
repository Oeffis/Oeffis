import { Module } from "@nestjs/common";
import { VrrModule } from "vrr/vrr.module";
import { LocationFinderController } from "./controller/locationFinder.controller";
import { LocationFinderService } from "./service/locationFinder.service";
import { LocationCoordinatesMapperService } from "./service/mapper/locationCoordinatesMapper.service";
import { LocationMapperService } from "./service/mapper/locationMapper.service";

@Module({
  controllers: [LocationFinderController],
  providers: [LocationFinderService, LocationMapperService, LocationCoordinatesMapperService],
  imports: [VrrModule],
  exports: [LocationMapperService, LocationCoordinatesMapperService]
})
export class LocationFinderModule {}
