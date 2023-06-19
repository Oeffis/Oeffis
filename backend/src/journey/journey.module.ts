import {Module} from "@nestjs/common";
import {JourneyController} from "./journey.controller";
import {JourneyService} from "./journey.service";

@Module({
  controllers: [JourneyController],
  providers: [JourneyService],
})

export class JourneyModule { }
