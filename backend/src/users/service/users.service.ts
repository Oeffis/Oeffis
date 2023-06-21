import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../entity/user.entity";

const users: User[] = [];

@Injectable()
export class UsersService {

  findAll(): User[] {
    return users;
  }

  create(createUser: User): User {
    users.push(createUser);
    return createUser;
  }

  findOne(index: number): unknown {
    if (index < 0 || index >= users.length) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }
    return users[index];
  }

  update(index: number, updateUser: User): User {
    if (index < 0 || index >= users.length) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    } else {
      users[index] = updateUser;
    }
    return users[index];
  }

  remove(index: number): User {
    let deletedUser = null;
    if (index < 0 || index >= users.length) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    } else {
      deletedUser = users[index];
      users.splice(index, 1);
    }
    return deletedUser;
  }
}
