import { Module } from "@nestjs/common";
import { UsersController } from "./controller/users.controller";
import { UsersService } from "./service/users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
