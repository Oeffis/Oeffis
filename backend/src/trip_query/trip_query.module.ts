import { Module } from "@nestjs/common";
import { TripQueryController } from "./controller/trip_query.controller";
import { TripQueryService } from "./service/trip_query.service";

@Module({
  providers: [TripQueryService],
  controllers: [TripQueryController]
})
export class TripQueryModule { }
