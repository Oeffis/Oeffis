import { Module } from "@nestjs/common";
import { VrrModule } from "../vrr/vrr.module";
import { TripQueryController } from "./controller/trip_query.controller";
import { TripQueryService } from "./service/trip_query.service";

@Module({
  providers: [TripQueryService],
  controllers: [TripQueryController],
  imports: [VrrModule]
})
export class TripQueryModule { }
