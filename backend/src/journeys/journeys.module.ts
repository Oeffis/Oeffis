import { Module } from "@nestjs/common";
import { importHafasClient } from "hafas/hafasClient";
import { VrrModule } from "vrr/vrr.module";
import { HAFAS_CLIENT } from "../symbols";
import { JourneysController } from "./controller/journeys.controller";
import { JourneysService } from "./service/journeys.service";

@Module({
  controllers: [JourneysController],
  providers: [
    JourneysService,
    {
      provide: HAFAS_CLIENT,
      useFactory: importHafasClient
    }
  ],
  imports: [VrrModule]
})

export class JourneysModule { }
