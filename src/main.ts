import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as os from 'os';

/**
 * Get the local network IP address
 */
function getNetworkIP(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name];
    if (nets) {
      for (const net of nets) {
        // Skip internal (loopback) and non-IPv4 addresses
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  }
  return 'localhost';
}

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
  // Note: LoggingInterceptor is registered via APP_INTERCEPTOR in AppModule
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ErrorInterceptor(),
  );

  // CORS configuration - Enhanced for mobile apps
  const corsOrigin = process.env.CORS_ORIGIN || '*';
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: process.env.CORS_CREDENTIALS === 'true',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    exposedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400, // 24 hours
  });

  // Swagger configuration
  const swaggerEnabled = process.env.SWAGGER_ENABLED !== 'false';
  const port = parseInt(process.env.PORT || '3000', 10);
  const host = process.env.HOST || '0.0.0.0';
  const networkIP = getNetworkIP();
  
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
      .addTag('admin', 'Admin management endpoints')
      .addServer(`http://localhost:${port}`, 'Local development')
      .addServer(`http://${networkIP}:${port}`, 'Network access')
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

    console.log(`\n📚 Swagger documentation available at:`);
    console.log(`   - http://localhost:${port}/${swaggerPath}`);
    console.log(`   - http://${networkIP}:${port}/${swaggerPath}`);
  }

  // Listen on all network interfaces (0.0.0.0) to allow access via network IP
  await app.listen(port, host);
  console.log(`\n🚀 Application is running on:`);
  console.log(`   Local:    http://localhost:${port}/${apiPrefix}`);
  console.log(`   Network:  http://${networkIP}:${port}/${apiPrefix}`);
  console.log(`\n📱 Access from mobile devices:`);
  console.log(`   Use the Network URL above in your Flutter app`);
  console.log(`   Base URL: http://${networkIP}:${port}/${apiPrefix}\n`);
}
bootstrap();
