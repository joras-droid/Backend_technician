import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkOrderTemplateDto {
  @ApiProperty({
    example: 'Standard Installation',
    description: 'Template name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Install equipment\nTest functionality\nDocument results',
    description: 'Tasks (multiline supported)',
  })
  @IsOptional()
  @IsString()
  tasks?: string;

  @ApiPropertyOptional({
    example: 'Standard installation template',
    description: 'Template notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateWorkOrderTemplateDto {
  @ApiPropertyOptional({
    example: 'Standard Installation',
    description: 'Template name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Install equipment\nTest functionality\nDocument results',
    description: 'Tasks (multiline supported)',
  })
  @IsOptional()
  @IsString()
  tasks?: string;

  @ApiPropertyOptional({
    example: 'Standard installation template',
    description: 'Template notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
