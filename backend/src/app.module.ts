import { Module } from "@nestjs/common";
import { AppController } from "./app/controller/app.controller";
import { AppService } from "./app/service/app.service";
import { StopFinderModule } from "./stop_finder/stop_finder.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [UsersModule, StopFinderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
