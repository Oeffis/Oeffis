import { Module } from "@nestjs/common";
import { ApiService } from "./service/api.service";

@Module({
  providers: [ApiService],
  exports: [ApiService]
})
export class VrrModule { }
