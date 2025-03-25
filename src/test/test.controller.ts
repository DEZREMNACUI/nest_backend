import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Test } from './entities/test.entity';

@ApiTags('测试')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建测试项目' })
  @ApiResponse({ status: 201, description: '创建成功', type: Test })
  @ApiResponse({ status: 400, description: '参数错误' })
  create(@Body() createTestDto: CreateTestDto): Promise<Test> {
    return this.testService.create(createTestDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有测试项目' })
  @ApiResponse({ status: 200, description: '获取成功', type: [Test] })
  findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定测试项目' })
  @ApiResponse({ status: 200, description: '获取成功', type: Test })
  @ApiResponse({ status: 404, description: '测试项目不存在' })
  findOne(@Param('id') id: string): Promise<Test> {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新测试项目' })
  @ApiResponse({ status: 200, description: '更新成功', type: Test })
  @ApiResponse({ status: 400, description: '参数错误' })
  @ApiResponse({ status: 404, description: '测试项目不存在' })
  update(
    @Param('id') id: string,
    @Body() updateTestDto: UpdateTestDto,
  ): Promise<Test> {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除测试项目' })
  @ApiResponse({ status: 204, description: '删除成功' })
  @ApiResponse({ status: 404, description: '测试项目不存在' })
  remove(@Param('id') id: string): Promise<void> {
    return this.testService.remove(+id);
  }
}
