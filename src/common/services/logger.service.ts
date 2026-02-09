import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

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

@Injectable()
export class LoggerService {
  private logFile: string;
  private logToFile: boolean;
  private logLevel: string;

  constructor(private configService: ConfigService) {
    this.logFile = this.configService.get<string>('LOG_FILE', 'logs/app.log');
    this.logToFile = this.configService.get<string>('LOG_FILE') !== undefined;
    this.logLevel = this.configService.get<string>('LOG_LEVEL', 'info');
    
    // Ensure logs directory exists
    if (this.logToFile) {
      const logDir = path.dirname(this.logFile);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
    }
  }

  logRequest(entry: LogEntry) {
    const logMessage = this.formatLog(entry);
    console.log(logMessage);

    if (this.logToFile) {
      this.writeToFile(logMessage);
    }
  }

  logResponse(entry: LogEntry) {
    const logMessage = this.formatLog(entry);
    const statusCode = entry.statusCode || 200;
    
    if (statusCode >= 500) {
      console.error(logMessage);
    } else if (statusCode >= 400) {
      console.warn(logMessage);
    } else {
      console.log(logMessage);
    }

    if (this.logToFile) {
      this.writeToFile(logMessage);
    }
  }

  logError(entry: LogEntry) {
    const logMessage = this.formatLog(entry);
    console.error(logMessage);

    if (this.logToFile) {
      this.writeToFile(logMessage);
    }
  }

  private formatLog(entry: LogEntry): string {
    const logFormat = this.configService.get<string>('LOG_FORMAT', 'text');

    if (logFormat === 'json') {
      return JSON.stringify(entry);
    }

    // Text format
    const parts = [
      `[${entry.timestamp}]`,
      entry.method,
      entry.url,
      entry.statusCode ? `HTTP ${entry.statusCode}` : '',
      entry.duration ? `${entry.duration}ms` : '',
      entry.userEmail ? `User: ${entry.userEmail}` : '',
      entry.ip ? `IP: ${entry.ip}` : '',
      entry.error ? `Error: ${entry.error}` : '',
    ].filter(Boolean);

    return parts.join(' | ');
  }

  private writeToFile(message: string) {
    try {
      fs.appendFileSync(this.logFile, message + '\n', 'utf8');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }
}
