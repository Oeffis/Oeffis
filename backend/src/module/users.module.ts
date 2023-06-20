import { Module } from "@nestjs/common";
import { UsersController } from "src/controller/users.controller";
import { UsersService } from "src/service/users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
