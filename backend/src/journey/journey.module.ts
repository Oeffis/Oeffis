import { Module } from "@nestjs/common";
import { HafasClient } from "hafas-client";
import { HAFAS_CLIENT } from "src/symbols";
import { JourneyController } from "./journey.controller";
import { JourneyService } from "./journey.service";

/**
 * Import of hafas-client (workaround to use ESM inside CommonJS project).
 */
const hafasClientImport: Promise<HafasClient> =
  (async (): Promise<HafasClient> => {
    const { createClient } = await (
      eval("import(\"hafas-client\")") as Promise<typeof import("hafas-client")>);
    const { profile } = await (
      eval("import(\"hafas-client/p/db/index.js\")") as Promise<typeof import("hafas-client/p/db/index.js")>);

    const userAgent = "oeffis";
    return createClient(profile, userAgent);
  })();


@Module({
  controllers: [JourneyController],
  providers: [
    JourneyService,
    {
      provide: HAFAS_CLIENT,
      useFactory: async (): Promise<HafasClient> => hafasClientImport
    }
  ],
})

export class JourneyModule { }
