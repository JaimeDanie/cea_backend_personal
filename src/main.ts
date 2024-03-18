import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const CORS: CorsOptions = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const appPort = config.get('port');

  app.setGlobalPrefix('api');

  const configSwagger = new DocumentBuilder()
    .setTitle('Cea Backend')
    .setDescription('Api cea  | By: Muto studio')
    .setContact("Jaime Daniel Barros Mendoza", "", "jaimedaniel.bm91@gmail.com")
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors(CORS);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(appPort);
}
bootstrap();
