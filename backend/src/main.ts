import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("NestJS Swagger")
    .setDescription("API description")
    .setVersion("1.0")
    .addServer("http://localhost:3000")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  // Endabled for testing purpose
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
