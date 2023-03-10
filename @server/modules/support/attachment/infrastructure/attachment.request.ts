import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class AttachmentFindRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fileUrl: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  module?: string
}

export class AttachmentUploadRequest extends PickType(AttachmentFindRequest, [
  'module',
]) {}
