"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const error_interceptor_1 = require("./common/interceptors/error.interceptor");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const apiPrefix = process.env.API_PREFIX || 'api/v1';
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new validation_pipe_1.CustomValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(), new error_interceptor_1.ErrorInterceptor());
    const corsOrigin = process.env.CORS_ORIGIN || '*';
    app.enableCors({
        origin: corsOrigin === '*' ? true : corsOrigin.split(','),
        credentials: process.env.CORS_CREDENTIALS === 'true',
    });
    const swaggerEnabled = process.env.SWAGGER_ENABLED !== 'false';
    if (swaggerEnabled) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Technician Management System API')
            .setDescription('API documentation for Technician Management System. This system manages work orders, technicians, clients, and provides secure authentication with JWT tokens.')
            .setVersion('1.0.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'JWT-auth')
            .addTag('auth', 'Authentication endpoints')
            .addTag('users', 'User management endpoints')
            .addTag('clients', 'Client management endpoints')
            .addTag('work-orders', 'Work order management endpoints')
            .addServer(`http://localhost:${process.env.PORT || 3000}`, 'Local development')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        const swaggerPath = process.env.SWAGGER_PATH || 'api/docs';
        swagger_1.SwaggerModule.setup(swaggerPath, app, document, {
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
//# sourceMappingURL=main.js.map