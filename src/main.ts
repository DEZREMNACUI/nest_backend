import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { runSeeds } from './database/seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 添加全局前缀
  app.setGlobalPrefix('api');

  // 添加全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 配置Swagger文档
  const config = new DocumentBuilder()
    .setTitle('Nest Play API')
    .setDescription('Nest Play API 文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 启用CORS
  app.enableCors();

  // 运行数据库种子
  const dataSource = app.get(DataSource);
  await runSeeds(dataSource);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`应用已启动，监听端口: ${port}`);
}
bootstrap();
