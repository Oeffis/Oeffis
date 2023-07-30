import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiOperation, ApiBadRequestResponse } from "@nestjs/swagger";
import { AppService } from "../service/vrr.service";
import { HelloWorld } from "../entity/helloworld.entity";
import { BadRequest } from "app/entity/badrequest.entity";

@Controller("app")
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({
    summary: "returns a \"Hello World!\" message",
    description: "Test enpoint to send a \"Hello World!\" message to frontend."
  })
  @ApiOkResponse({
    description: "Returns a \"Hello World!\" message.",
    type: [HelloWorld],
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
