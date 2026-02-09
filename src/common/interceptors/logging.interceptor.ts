import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, body, query, params, headers, ip } = request;
    const userAgent = headers['user-agent'] || '';
    const startTime = Date.now();

    // Mask sensitive data in request body
    const sanitizedBody = this.sanitizeBody(body);

    // Prepare log entry
    const logEntry: any = {
      timestamp: new Date().toISOString(),
      method,
      url,
      ip: ip || request.socket.remoteAddress,
      userAgent,
      userId: (request as any).user?.id,
      userEmail: (request as any).user?.email,
      userRole: (request as any).user?.role,
    };

    // Add optional fields only if they exist
    if (Object.keys(query).length > 0) {
      logEntry.query = query;
    }
    if (Object.keys(params).length > 0) {
      logEntry.params = params;
    }
    if (sanitizedBody && Object.keys(sanitizedBody).length > 0) {
      logEntry.body = sanitizedBody;
    }

    // Log request
    this.loggerService.logRequest(logEntry);

    return next.handle().pipe(
      tap({
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
      }),
    );
  }

  private sanitizeBody(body: any): any {
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
}
