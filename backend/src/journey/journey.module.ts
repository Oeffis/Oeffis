import { Module } from "@nestjs/common";
import { ApiService } from "vrr/service/api.service";
import { VrrModule } from "vrr/vrr.module";
import { JourneyController } from "./controller/journey.controller";
import { JourneyService } from "./service/journey.service";

@Module({
  providers: [JourneyService],
  controllers: [JourneyController],
  imports: [VrrModule, ApiService]
})
export class JourneyModule {

}
