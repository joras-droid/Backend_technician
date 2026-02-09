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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let LoggerService = class LoggerService {
    configService;
    logFile;
    logToFile;
    logLevel;
    constructor(configService) {
        this.configService = configService;
        this.logFile = this.configService.get('LOG_FILE', 'logs/app.log');
        this.logToFile = this.configService.get('LOG_FILE') !== undefined;
        this.logLevel = this.configService.get('LOG_LEVEL', 'info');
        if (this.logToFile) {
            const logDir = path.dirname(this.logFile);
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }
        }
    }
    logRequest(entry) {
        const logMessage = this.formatLog(entry);
        console.log(logMessage);
        if (this.logToFile) {
            this.writeToFile(logMessage);
        }
    }
    logResponse(entry) {
        const logMessage = this.formatLog(entry);
        const statusCode = entry.statusCode || 200;
        if (statusCode >= 500) {
            console.error(logMessage);
        }
        else if (statusCode >= 400) {
            console.warn(logMessage);
        }
        else {
            console.log(logMessage);
        }
        if (this.logToFile) {
            this.writeToFile(logMessage);
        }
    }
    logError(entry) {
        const logMessage = this.formatLog(entry);
        console.error(logMessage);
        if (this.logToFile) {
            this.writeToFile(logMessage);
        }
    }
    formatLog(entry) {
        const logFormat = this.configService.get('LOG_FORMAT', 'text');
        if (logFormat === 'json') {
            return JSON.stringify(entry);
        }
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
    writeToFile(message) {
        try {
            fs.appendFileSync(this.logFile, message + '\n', 'utf8');
        }
        catch (error) {
            console.error('Failed to write to log file:', error);
        }
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoggerService);
//# sourceMappingURL=logger.service.js.map