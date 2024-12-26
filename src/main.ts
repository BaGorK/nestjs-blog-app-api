import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // properties that does not exist in the dto will be stripped
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * swagger documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Learn NestJs By Building A Blog Api')
    // write me a blog api description
    .setDescription(
      'Learn NestJs By Building A Blog Api: http://localhost:3000',
    )
    .setTermsOfService('http://swagger.io/terms/')
    .setLicense('MIT License', 'http://swagger.io/license/')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  /**
   * Instantiate
   */
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
