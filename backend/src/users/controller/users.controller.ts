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
import { AppHttpException } from "app/entity/apphttpexception.entity";
import { User } from "users/entity/user.entity";
import { UsersService } from "../service/users.service";


@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: "returns all users" })
  @ApiOkResponse({
    description: "Return all Users as JSON array.",
    type: [User],
  })
  findAll(): unknown {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "creates a new user, returns the created on" })
  @ApiCreatedResponse({ description: "Create a User.", type: User })
  create(@Body() createUser: User): unknown {
    return this.usersService.create(createUser);
  }

  @Get("/:index")
  @ApiOperation({ summary: "returns a specific user" })
  @ApiOkResponse({ description: "Return a User by index.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: AppHttpException,
  })
  @ApiParam({ description: "Users index", name: "index" })
  findOne(@Param("index") index: string): unknown {
    return this.usersService.findOne(+index);
  }

  @Patch("/:index")
  @ApiOperation({ summary: "updates a specific user" })
  @ApiCreatedResponse({ description: "Update a User by index.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: AppHttpException,
  })
  @ApiParam({ description: "Users index", name: "index" })
  update(@Param("index") index: string, @Body() updateUser: User): unknown {
    return this.usersService.update(+index, updateUser);
  }

  @Delete("/:index")
  @ApiOperation({ summary: "deletes a specific user" })
  @ApiOkResponse({ description: "Delete a User by index.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: AppHttpException,
  })
  @ApiParam({ description: "Users index", name: "index" })
  remove(@Param("index") index: string): unknown {
    return this.usersService.remove(+index);
  }
}
