import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

let users = [];

@Injectable()
export class UserService {
  create(createUser: User) {
    users.push(createUser);
    return createUser;
  }

  findAll() {
    return users;
  }

  findOne(index: number) {
    if(index < 0 || index >= users.length) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return users[index];
  }

  update(index: number, updateUser: User) {
    if(index < 0 || index >= users.length) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else {
      users[index] = updateUser;
    }
    return users[index];
  }

  remove(index: number) {
    let deletedUser = null;
    if(index < 0 || index >= users.length) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else {
      deletedUser = users[index];
      users.slice(index, 1);
    }
    return deletedUser;
  }
}
