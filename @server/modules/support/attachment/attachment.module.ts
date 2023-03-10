import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '@server/config'
import * as path from 'path'
import { AuthModule } from '../../iam/auth/auth.module'
import { EttAttachment } from './infrastructure/attachment.entity'
import { AttachmentService } from './infrastructure/attachment.service'
import { AttachmentController } from './v1/attachment.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([EttAttachment]),
    AuthModule,
    MulterModule.register({
      dest: path.resolve('./') + config.assets.storage,
    }),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
