"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const logger_service_1 = require("../services/logger.service");
let LoggingInterceptor = class LoggingInterceptor {
    loggerService;
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const { method, url, body, query, params, headers, ip } = request;
        const userAgent = headers['user-agent'] || '';
        const startTime = Date.now();
        const sanitizedBody = this.sanitizeBody(body);
        const logEntry = {
            timestamp: new Date().toISOString(),
            method,
            url,
            ip: ip || request.socket.remoteAddress,
            userAgent,
            userId: request.user?.id,
            userEmail: request.user?.email,
            userRole: request.user?.role,
        };
        if (Object.keys(query).length > 0) {
            logEntry.query = query;
        }
        if (Object.keys(params).length > 0) {
            logEntry.params = params;
        }
        if (sanitizedBody && Object.keys(sanitizedBody).length > 0) {
            logEntry.body = sanitizedBody;
        }
        this.loggerService.logRequest(logEntry);
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                const duration = Date.now() - startTime;
                const statusCode = response.statusCode;
                this.loggerService.logResponse({
                    ...logEntry,
                    timestamp: new Date().toISOString(),
                    statusCode,
                    duration,
                });
            },
            error: (error) => {
                const duration = Date.now() - startTime;
                const statusCode = error.status || 500;
                this.loggerService.logError({
                    ...logEntry,
                    timestamp: new Date().toISOString(),
                    statusCode,
                    duration,
                    error: error.message,
                });
            },
        }));
    }
    sanitizeBody(body) {
        if (!body || typeof body !== 'object') {
            return body;
        }
        const sensitiveFields = [
            'password',
            'currentPassword',
            'newPassword',
            'confirmPassword',
            'accessToken',
            'refreshToken',
            'token',
            'authorization',
            'secret',
            'apiKey',
            'privateKey',
        ];
        const sanitized = { ...body };
        for (const field of sensitiveFields) {
            if (sanitized[field]) {
                sanitized[field] = '***REDACTED***';
            }
        }
        return sanitized;
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map