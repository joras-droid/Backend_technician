import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export interface ValidationPipeOptions {
    whitelist?: boolean;
    forbidNonWhitelisted?: boolean;
    transform?: boolean;
}
export declare class CustomValidationPipe implements PipeTransform<any> {
    private options?;
    constructor(options?: ValidationPipeOptions | undefined);
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
