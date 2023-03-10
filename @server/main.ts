import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import * as path from 'path'
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked'
import { AppModule } from './app.module'
import { config } from './config'
import { seeders } from './database/seeds/seed.module'
import { swaggerConfig } from './infrastructure/swagger/swagger.config'

async function bootstrap() {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()

  const globalPrefix = config.app.prefix
  const publicPath = path.resolve('./') + config.assets.public
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const host = config.server.host
  const docsUrl = 'docs'

  app.useStaticAssets(publicPath)
  app.setGlobalPrefix(globalPrefix)
  app.enableCors()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(`${config.app.prefix}/${docsUrl}`, app, document)

  await seeders()
  await app.listen(config.server.port)

  Logger.log(`Application running at ${host}`, 'NestApplication')
  Logger.log(`API Documentation Swagger at ${host}/${docsUrl}`, 'SwaggerUI')
}
bootstrap()
