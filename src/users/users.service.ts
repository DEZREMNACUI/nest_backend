import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  /**
   * 创建新用户
   * @param createUserDto - 创建用户的数据传输对象
   * @returns 返回创建的用户实体
   * @throws NotFoundException - 当指定的角色不存在时抛出
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 对密码进行哈希处理
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // 查找用户指定的角色
    const role = await this.rolesRepository.findOne({
      where: { name: createUserDto.role },
    });
    // 如果角色不存在，抛出异常
    if (!role) {
      throw new NotFoundException(`角色 ${createUserDto.role} 不存在`);
    }
    // 创建用户实体
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword, // 使用哈希后的密码
      role, // 设置用户角色
    });
    // 保存用户到数据库并返回
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['role'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`用户名 ${username} 不存在`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.role) {
      const role = await this.rolesRepository.findOne({
        where: { name: updateUserDto.role },
      });
      if (!role) {
        throw new NotFoundException(`角色 ${updateUserDto.role} 不存在`);
      }
      user.role = role;
    }
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }
  }
}
