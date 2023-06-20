import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AppService } from "../service/app.service";
import { HelloWorld } from "../schema/helloworld.schema";

@Controller("app")
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("helloworld")
  @ApiOperation({ summary: "returns a \"Hello World!\" message" })
  @ApiOkResponse({
    description: "Returns a \"Hello World!\" message.",
    type: [HelloWorld],
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
