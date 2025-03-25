import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '测试ID' })
  id: number;

  @Column()
  @ApiProperty({ description: '描述', example: '这是一个测试描述' })
  description: string;
}
