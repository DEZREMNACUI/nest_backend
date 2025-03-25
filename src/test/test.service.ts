import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const test = this.testRepository.create(createTestDto);
    return this.testRepository.save(test);
  }

  async findAll(): Promise<Test[]> {
    return this.testRepository.find();
  }

  async findOne(id: number): Promise<Test> {
    const test = await this.testRepository.findOne({ where: { id } });
    if (!test) {
      throw new NotFoundException(`ID为 ${id} 的测试项目不存在`);
    }
    return test;
  }

  async update(id: number, updateTestDto: UpdateTestDto): Promise<Test> {
    const test = await this.findOne(id);
    Object.assign(test, updateTestDto);
    return this.testRepository.save(test);
  }

  async remove(id: number): Promise<void> {
    const result = await this.testRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID为 ${id} 的测试项目不存在`);
    }
  }
}
