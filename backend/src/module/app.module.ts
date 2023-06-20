import { Module } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { AppService } from "src/service/app.service";
import { AppController } from "src/controller/app.controller";

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
