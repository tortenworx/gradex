import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'fatal', 'log', 'verbose', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(8000);
}
bootstrap();
