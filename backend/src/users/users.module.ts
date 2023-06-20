import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "users/users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
