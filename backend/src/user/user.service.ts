import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

let user = [];

@Injectable()
export class UserService {
  create(createUser: User) {
    user.push(createUser);
    return createUser;
  }

  findAll() {
    return user;
  }

  findOne(index: number) {
    if(index < 0 || index >= user.length) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return user[index];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
