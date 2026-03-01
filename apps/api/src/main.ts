import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new ConsoleLogger())
  app.enableCors({ origin: 'http://localhost:3001' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
