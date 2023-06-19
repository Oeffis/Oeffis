import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AppHttpException } from "../app.http.exception";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: "Create a User" })
  @ApiCreatedResponse({ description: "Create a User.", type: User })
  create(@Body() createUser: User): unknown {
    return this.userService.create(createUser);
  }

  @Get("get/all")
  @ApiOperation({ summary: "Return all Users" })
  @ApiOkResponse({
    description: "Return all Users as JSON array.",
    type: [User],
  })
  findAll(): unknown {
    return this.userService.findAll();
  }

  @Get("get/:index")
  @ApiOperation({ summary: "Return a User by index" })
  @ApiOkResponse({ description: "Return a User by index.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: AppHttpException,
  })
  @ApiParam({ description: "Users index", name: "index" })
  findOne(@Param("index") index: string): unknown {
    return this.userService.findOne(+index);
  }

  @Patch("update/:index")
  @ApiOperation({ summary: "Update a User by index" })
  @ApiCreatedResponse({ description: "Update a User by index.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: AppHttpException,
  })
  @ApiParam({ description: "Users index", name: "index" })
  update(@Param("index") index: string, @Body() updateUser: User): unknown {
    return this.userService.update(+index, updateUser);
  }

  @Delete("delete/:index")
  @ApiOperation({ summary: "Delete a User by index" })
  @ApiOkResponse({ description: "Delete a User by index.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: AppHttpException,
  })
  @ApiParam({ description: "Users index", name: "index" })
  remove(@Param("index") index: string): unknown {
    return this.userService.remove(+index);
  }
}
