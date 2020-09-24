import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/loger.middleware';
import { LogerInterceptor } from './interceptor/loger.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 处理跨域问题
  app.enableCors();
  // 监听所有的请求路由，使用中间件打印入参
  // app.use(express.json()); // For parsing application/json
  // app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // app.use(logger);
  // // 使用拦截器打印出参
  // app.useGlobalInterceptors(new LogerInterceptor());
  // 设置api前缀
  app.setGlobalPrefix('api');
  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('simple-pm-nest')
    .setDescription('simple-pm-nest  API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(4000);
}
bootstrap();
