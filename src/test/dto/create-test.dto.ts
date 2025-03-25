import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({ description: '描述', example: '这是一个测试描述' })
  @IsNotEmpty({ message: '描述不能为空' })
  @IsString({ message: '描述必须是字符串' })
  description: string;
}
