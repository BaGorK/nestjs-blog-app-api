import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

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

  app.useGlobalInterceptors(new TimeoutInterceptor());

  const ENV = process.env.NODE_ENV || 'development';

  /**
   * swagger documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Learn NestJs By Building A Blog Api')
    // write me a blog api description
    .setDescription(
      `Learn NestJs By Building A Blog Api: This is a simple blog api built with nestjs and postgresql.`,
    )
    .setTermsOfService('http://swagger.io/terms/')
    .setLicense('MIT License', 'http://swagger.io/license/')
    .addServer(
      ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://nestjs-blog-app-api.onrender.com',
    )
    .addBearerAuth() // Add Bearer token support
    .setVersion('1.0')
    .build();
  /**
   * Instantiate
   */
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // enable cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
