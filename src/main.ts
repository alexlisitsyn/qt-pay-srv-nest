import { NestFactory } from '@nestjs/core';
import { INestApplication, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // const configService = app.get(ConfigService);
  // const REDIS_HOST = configService.get<string>('REDIS_HOST');
  // const REDIS_PORT = configService.get<number>('REDIS_PORT');
  // console.log('>>', REDIS_HOST, REDIS_PORT);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1'
  });

  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGINS?.split(','),
    // methods: ['GET', 'POST'],
  });

  const options = new DocumentBuilder()
    .setTitle('QTrade Pay Service')
    .setDescription('Платежный сервис')
    .setVersion('1.0')
    // .addTag('pay')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.SERVER_PORT || 3001);
}

bootstrap().then();
