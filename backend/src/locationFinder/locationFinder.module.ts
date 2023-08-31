import { Module } from "@nestjs/common";
import { ApiService } from "vrr/service/api.service";
import { VrrModule } from "vrr/vrr.module";
import { LocationFinderController } from "./controller/locationFinder.controller";
import { LocationFinderService } from "./service/locationFinder.service";

@Module({
  controllers: [LocationFinderController],
  providers: [LocationFinderService],
  imports: [VrrModule, ApiService]
})
export class LocationFinderModule { }
