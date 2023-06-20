import { Module } from "@nestjs/common";
import { AppController } from "controller/app.controller";
import { AppService } from "service/app.service";
import { UsersModule } from "./users.module";

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
