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
import { User } from "users/entity/user.entity";
import { UsersService } from "../service/users.service";
import { BadRequest } from "app/entity/badrequest.entity";
import { UserNotFound } from "app/entity/usernotfound.entity";


@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({
    summary: "returns all users",
    description: "Get all users."
  })
  @ApiOkResponse({
    description: "Return all Users as JSON array.",
    type: [User],
  })
  @ApiNotFoundResponse({
    description: "Bad request.",
    type: BadRequest,
  })
  findAll(): unknown {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: "creates a new user, returns the created on",
    description: "Create a new user."
  })
  @ApiCreatedResponse({ description: "Returns the created user.", type: User })
  @ApiNotFoundResponse({
    description: "Bad request.",
    type: BadRequest,
  })
  create(@Body() createUser: User): unknown {
    return this.usersService.create(createUser);
  }

  @Get("/:index")
  @ApiOperation({
    summary: "returns a specific user",
    description: "Get a specific user."
  })
  @ApiOkResponse({ description: "Returns a User by index.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: UserNotFound,
  })
  @ApiParam({ description: "Users index", name: "index" })
  findOne(@Param("index") index: string): unknown {
    return this.usersService.findOne(+index);
  }

  @Patch("/:index")
  @ApiOperation({
    summary: "updates a specific user",
    description: "Update a specific user."
  })
  @ApiCreatedResponse({ description: "Returns the updated user.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: UserNotFound,
  })
  @ApiParam({ description: "Users index", name: "index" })
  update(@Param("index") index: string, @Body() updateUser: User): unknown {
    return this.usersService.update(+index, updateUser);
  }

  @Delete("/:index")
  @ApiOperation({
    summary: "deletes a specific user",
    description: "Delete a specific user."
  })
  @ApiOkResponse({ description: "Returns the deleted user.", type: User })
  @ApiNotFoundResponse({
    description: "User not found.",
    type: UserNotFound,
  })
  @ApiParam({ description: "Users index", name: "index" })
  remove(@Param("index") index: string): unknown {
    return this.usersService.remove(+index);
  }
}
