import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { createSwagger } from './shared/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
    initializeTransactionalContext();
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('MAIN');
    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    createSwagger(app);

    await app.listen(3000, '0.0.0.0');
    const url = await app.getUrl();

    logger.verbose(`Server started at ${url}`);
    logger.verbose(`Swagger available on ${url}/docs/api`);
}
bootstrap();
