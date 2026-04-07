/* eslint-disable import/no-extraneous-dependencies */
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const expressBasicAuth = require('express-basic-auth');
const configService = new ConfigService();

export const SWAGGER_PATH = configService.get<string>('SWAGGER_PATH', '/docs/api');

const options = new DocumentBuilder()
    .setTitle('Фотостудия')
    .setDescription('Документация REST API')
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Enter JWT token',
            in: 'header',
        },
        'Authorization',
    )
    .addSecurity('secret-key', {
        type: 'apiKey',
        name: 'secret-key',
        description: 'API-ключ для платформы, с который вызываются методы',
        in: 'header',
    })
    .build();

export function createSwagger(app: INestApplication): INestApplication {
    const login = configService.getOrThrow<string>('SWAGGER_LOGIN');
    const password = configService.getOrThrow<string>('SWAGGER_PASS');

    app.use(
        SWAGGER_PATH,
        expressBasicAuth({
            challenge: true,
            users: { [login]: password },
        }),
    );

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_PATH, app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    return app;
}
