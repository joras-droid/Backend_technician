import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private s3Client;
    private bucketName;
    private region;
    constructor(configService: ConfigService);
    generatePresignedUrl(key: string, contentType: string, expiresIn?: number): Promise<string>;
    getProfileImageKey(userId: string, fileExtension: string): string;
    getWorkOrderAttachmentKey(workOrderId: string, attachmentId: string, fileExtension: string, type?: 'photo' | 'receipt'): string;
    getPublicUrl(key: string): string;
    isValidFileType(contentType: string): boolean;
    getMaxFileSize(): number;
}
