import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/v1/api.module';
import { typeOrmConfig } from './infra/postgres/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        ApiModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
