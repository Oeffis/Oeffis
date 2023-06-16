import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

const users = [];

@Injectable()
export class UserService {
  create(createUser: User): User {
    users.push(createUser);
    return createUser;
  }

  findAll(): any {
    return users;
  }

  findOne(index: number): any {
    if (index < 0 || index >= users.length) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }
    return users[index];
  }

  update(index: number, updateUser: User): any {
    if (index < 0 || index >= users.length) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    } else {
      users[index] = updateUser;
    }
    return users[index];
  }

  remove(index: number): any {
    let deletedUser = null;
    if (index < 0 || index >= users.length) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    } else {
      deletedUser = users[index];
      users.slice(index, 1);
    }
    return deletedUser;
  }
}
