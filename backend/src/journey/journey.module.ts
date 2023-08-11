import { Module } from "@nestjs/common";
import { JourneyService } from "./service/journey.service";
import { JourneyController } from "./controller/journey.controller";


@Module({
  providers: [JourneyService],
  controllers: [JourneyController]
})
export class JourneyModule { }
