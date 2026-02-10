"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const error_interceptor_1 = require("./common/interceptors/error.interceptor");
const swagger_1 = require("@nestjs/swagger");
const os = __importStar(require("os"));
function getNetworkIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const nets = interfaces[name];
        if (nets) {
            for (const net of nets) {
                if (net.family === 'IPv4' && !net.internal) {
                    return net.address;
                }
            }
        }
    }
    return 'localhost';
}
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
        maxAge: 86400,
    });
    const swaggerEnabled = process.env.SWAGGER_ENABLED !== 'false';
    const port = parseInt(process.env.PORT || '3000', 10);
    const host = process.env.HOST || '0.0.0.0';
    const networkIP = getNetworkIP();
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
            .addTag('admin', 'Admin management endpoints')
            .addServer(`https://technician.nirajan.dev`, 'Local development')
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
        console.log(`\n📚 Swagger documentation available at:`);
        console.log(`   - http://localhost:${port}/${swaggerPath}`);
        console.log(`   - http://${networkIP}:${port}/${swaggerPath}`);
    }
    await app.listen(port, host);
    console.log(`\n🚀 Application is running on:`);
    console.log(`   Local:    http://localhost:${port}/${apiPrefix}`);
    console.log(`   Network:  http://${networkIP}:${port}/${apiPrefix}`);
    console.log(`\n📱 Access from mobile devices:`);
    console.log(`   Use the Network URL above in your Flutter app`);
    console.log(`   Base URL: http://${networkIP}:${port}/${apiPrefix}\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map