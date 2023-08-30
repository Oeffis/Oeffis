import { Controller, Get } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequest } from "app/entity/badrequest.entity";
import { HelloWorld } from "../entity/helloworld.entity";
import { AppService } from "../service/app.service";

@Controller("app")
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({
    summary: "returns a \"Hello World!\" message",
    description: "Test endpoint to send a \"Hello World!\" message to frontend."
  })
  @ApiOkResponse({
    description: "Returns a \"Hello World!\" message.",
    type: [HelloWorld]
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
