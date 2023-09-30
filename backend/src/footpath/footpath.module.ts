import { Module } from "@nestjs/common";
import { FootpathMapperService } from "./service/mapper/footpathMapper.service";

@Module({
  providers: [FootpathMapperService],
  exports: [FootpathMapperService]
})
export class FootpathModule {}
