import { Module } from "@nestjs/common";
import { AppController } from "./app/controller/app.controller";
import { AppService } from "./app/service/app.service";
import { LocationFinderModule } from "./locationFinder/locationFinder.module";
import { JourneyModule } from "./journey/journey.module";
import { VrrModule } from "./vrr/vrr.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [UsersModule, LocationFinderModule, JourneyModule, VrrModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
