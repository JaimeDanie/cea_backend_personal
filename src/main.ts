import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const CORS: CorsOptions = {
  origin: true, 
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  credentials: true
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  const appPort = config.get('port')

  app.setGlobalPrefix('api')

  app.enableCors(CORS)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  console.log(`
    Environment: ${process.env.APP_ENV},
    Node: ${process.env.NODE_ENV},
    Port: ${config.get('port')}
  `)

  await app.listen(appPort);
}
bootstrap();
