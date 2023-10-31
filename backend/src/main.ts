import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Enable validation + transformation using ValidationPipe.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //app.useGlobalPipes(new ValidationPipe({ transform: true, disableErrorMessages: true }));

  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger')
    .setDescription('API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api-docs', app, document);

  // Enabled for testing purpose
  app.enableCors();

  await app.listen(3000);
}
void bootstrap();
