import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

let users: User[] = [];

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
    if (index < 0 || index >= users.length) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return users[index];
  }

  update(index: number, updateUser: User) {
    if (index < 0 || index >= users.length) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else {
      users[index] = updateUser;
    }
    return users[index];
  }

  remove(index: number) {
    let deletedUser = null;
    if (index < 0 || index >= users.length) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else {
      deletedUser = users[index];
      const newUsers: User[] = [];
      for(let i = 0; i < users.length; i++) {
        if(index !== i) {
          newUsers.push(users[i]);
        }
      }
      users = newUsers;
    }
    return deletedUser;
  }
}
