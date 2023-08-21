import { Module } from "@nestjs/common";
import { VrrModule } from "../vrr/vrr.module";
import { StopFinderController } from "./controller/stop_finder.controller";
import { StopFinderService } from "./service/stop_finder.service";

@Module({
  controllers: [StopFinderController],
  providers: [StopFinderService],
  imports: [VrrModule]
})
export class StopFinderModule { }
