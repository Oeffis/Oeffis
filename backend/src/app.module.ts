import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { JourneyModule } from "./journey/journey.module";

@Module({
  imports: [UserModule, JourneyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
