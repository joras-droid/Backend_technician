import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME') || '';

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || '',
      },
    });
  }

  /**
   * Generate presigned URL for direct client upload to S3
   * @param key S3 object key (path)
   * @param contentType MIME type of the file
   * @param expiresIn URL expiration time in seconds (default: 3600 = 1 hour)
   * @returns Presigned URL for PUT operation
   */
  async generatePresignedUrl(
    key: string,
    contentType: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn });
    return url;
  }

  /**
   * Generate S3 key for profile images
   * @param userId User ID
   * @param fileExtension File extension (e.g., 'jpg', 'png')
   * @returns S3 key path
   */
  getProfileImageKey(userId: string, fileExtension: string): string {
    return `profiles/${userId}/${Date.now()}.${fileExtension}`;
  }

  /**
   * Generate S3 key for work order attachments
   * @param workOrderId Work order ID
   * @param attachmentId Attachment ID
   * @param fileExtension File extension
   * @param type Attachment type (photo, receipt, etc.)
   * @returns S3 key path
   */
  getWorkOrderAttachmentKey(
    workOrderId: string,
    attachmentId: string,
    fileExtension: string,
    type: 'photo' | 'receipt' = 'photo',
  ): string {
    return `work-orders/${workOrderId}/${type}/${attachmentId}.${fileExtension}`;
  }

  /**
   * Get public URL for S3 object (after upload)
   * @param key S3 object key
   * @returns Public URL
   */
  getPublicUrl(key: string): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
  }

  /**
   * Validate file type against allowed types
   * @param contentType MIME type
   * @returns boolean
   */
  isValidFileType(contentType: string): boolean {
    const allowedTypes = this.configService
      .get<string>('ALLOWED_FILE_TYPES', 'image/jpeg,image/png,image/jpg,image/webp,application/pdf')
      .split(',')
      .map((t) => t.trim());

    return allowedTypes.includes(contentType);
  }

  /**
   * Get maximum file size in bytes
   * @returns Max file size
   */
  getMaxFileSize(): number {
    return parseInt(
      this.configService.get<string>('MAX_FILE_SIZE', '10485760'),
      10,
    );
  }
}
