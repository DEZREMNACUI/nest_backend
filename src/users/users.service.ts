import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const user = {
      id: this.users.length + 1,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUser: Partial<User>): User | null {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }

    Object.assign(user, { ...updateUser, updatedAt: new Date() });
    return user;
  }

  remove(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }
}
