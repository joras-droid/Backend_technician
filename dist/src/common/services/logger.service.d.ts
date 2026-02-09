import { ConfigService } from '@nestjs/config';
export interface LogEntry {
    timestamp: string;
    method: string;
    url: string;
    ip?: string;
    userAgent?: string;
    userId?: string;
    userEmail?: string;
    userRole?: string;
    statusCode?: number;
    duration?: number;
    query?: any;
    params?: any;
    body?: any;
    error?: string;
}
export declare class LoggerService {
    private configService;
    private logFile;
    private logToFile;
    private logLevel;
    constructor(configService: ConfigService);
    logRequest(entry: LogEntry): void;
    logResponse(entry: LogEntry): void;
    logError(entry: LogEntry): void;
    private formatLog;
    private writeToFile;
}
