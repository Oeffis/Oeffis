import { Module } from "@nestjs/common";
import { JourneyController } from "./controller/journey.controller";
import { JourneyService } from "./service/journey.service";

@Module({
  providers: [JourneyService],
  controllers: [JourneyController]
})
export class JourneyModule {

}
