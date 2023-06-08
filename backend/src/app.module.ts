import { Module } from "@nestjs/common";
import { AppController } from "./app/controller/app.controller";
import { AppService } from "./app/service/app.service";
import { UsersModule } from "./users/users.module";
import { JourneyModule } from "./journey/journey.module";

@Module({
  imports: [UsersModule, JourneyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
