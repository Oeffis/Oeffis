import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppHttpException } from 'src/app.http.exception';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a User' })
  @ApiCreatedResponse({ description: 'Create a User.', type: User })
  create(@Body() createUser: User) {
    return this.userService.create(createUser);
  }

  @Get('get/all')
  @ApiOperation({ summary: 'Return all Users' })
  @ApiOkResponse({ description: 'Return all Users as JSON array.', type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Get('get/:index')
  @ApiOperation({ summary: 'Return a User by index' })
  @ApiOkResponse({ description: 'Return a User by index.', type: User })
  @ApiNotFoundResponse({ description: 'User not found.', type: AppHttpException })
  @ApiParam({description: 'Users index', name: 'index'})
  findOne(@Param('index') index: string) {
    return this.userService.findOne(+index);
  }

  @Patch('update/:index')
  @ApiOperation({ summary: 'Update a User by index' })
  @ApiCreatedResponse({ description: 'Update a User by index.', type: User })
  @ApiNotFoundResponse({ description: 'User not found.', type: AppHttpException })
  @ApiParam({description: 'Users index', name: 'index'})
  update(@Param('index') index: string, @Body() updateUser: User) {
    return this.userService.update(+index, updateUser);
  }

  @Delete('delete/:index')
  @ApiOperation({ summary: 'Delete a User by index' })
  @ApiOkResponse({ description: 'Delete a User by index.', type: User })
  @ApiNotFoundResponse({ description: 'User not found.', type: AppHttpException })
  @ApiParam({description: 'Users index', name: 'index'})
  remove(@Param('index') index: String) {
    return this.userService.remove(+index);
  }
}
