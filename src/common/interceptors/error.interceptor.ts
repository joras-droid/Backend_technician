import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(() => error);
        }

        // Handle Prisma errors
        if (error.code === 'P2002') {
          return throwError(
            () =>
              new HttpException(
                {
                  statusCode: HttpStatus.CONFLICT,
                  message: 'Unique constraint violation',
                  error: 'A record with this value already exists',
                },
                HttpStatus.CONFLICT,
              ),
          );
        }

        // Handle unknown errors
        return throwError(
          () =>
            new HttpException(
              {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
