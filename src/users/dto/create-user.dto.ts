import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../entities/role.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'admin', description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @ApiProperty({ example: 'password123', description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码长度不能少于6个字符' })
  password: string;

  @ApiProperty({ example: 'admin@example.com', description: '邮箱' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @ApiProperty({ example: RoleType.USER, description: '角色' })
  @IsNotEmpty({ message: '角色不能为空' })
  role: RoleType;
}
