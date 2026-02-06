import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  const apiPrefix = process.env.API_PREFIX || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Global validation pipe
  app.useGlobalPipes(
    new CustomValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global interceptors
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ErrorInterceptor(),
  );

  // CORS configuration
  const corsOrigin = process.env.CORS_ORIGIN || '*';
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: process.env.CORS_CREDENTIALS === 'true',
  });

  // Swagger configuration
  const swaggerEnabled = process.env.SWAGGER_ENABLED !== 'false';
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Technician Management System API')
      .setDescription(
        'API documentation for Technician Management System. This system manages work orders, technicians, clients, and provides secure authentication with JWT tokens.',
      )
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management endpoints')
      .addTag('clients', 'Client management endpoints')
      .addTag('work-orders', 'Work order management endpoints')
      .addServer(`http://localhost:${process.env.PORT || 3000}`, 'Local development')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    const swaggerPath = process.env.SWAGGER_PATH || 'api/docs';
    SwaggerModule.setup(swaggerPath, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });

    console.log(`Swagger documentation available at: http://localhost:${process.env.PORT || 3000}/${swaggerPath}`);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/${apiPrefix}`);
}
bootstrap();
