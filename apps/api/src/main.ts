import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { readFileSync } from 'fs';

const httpsOptions = {
  key: readFileSync('./ssl/gradex.backend.key'),
  cert: readFileSync('./ssl/gradex.backend.crt'),
};

async function bootstrap() {
  let app;
  if (process.env.ENV == 'development') {
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'debug', 'fatal', 'log', 'verbose', 'warn'],
      httpsOptions,
    });
  } else {
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'debug', 'fatal', 'log', 'verbose', 'warn'],
    });
  }
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(8080);
}
bootstrap();
