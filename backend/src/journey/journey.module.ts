import { Module } from "@nestjs/common";
import { importHafasClient } from "hafas/hafasClient";
import { HAFAS_CLIENT } from "../symbols";
import { JourneyController } from "./journey.controller";
import { JourneyService } from "./journey.service";

@Module({
  controllers: [JourneyController],
  providers: [
    JourneyService,
    {
      provide: HAFAS_CLIENT,
      useFactory: importHafasClient
    }
  ],
})

export class JourneyModule { }
