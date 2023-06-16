import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { HelloWorld } from "./helloworld.entity";

@Controller("app")
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("helloworld")
  @ApiOperation({ summary: "Returns \"Hello World!\"" })
  @ApiOkResponse({
    description: "Returns a \"Hello World!\" message.",
    type: [HelloWorld],
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
