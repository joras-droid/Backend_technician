import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendPasswordResetOtp(to: string, otp: string, firstName?: string): Promise<void>;
    private getPasswordResetOtpTemplate;
}
