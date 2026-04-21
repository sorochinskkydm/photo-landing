import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

dotenv.config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.getOrThrow<string>('DB_HOST'),
    port: configService.getOrThrow<number>('DB_PORT'),
    username: configService.getOrThrow<string>('DB_LOGIN'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_NAME'),
    entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
    logging: false,
    synchronize: true,
    migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
    migrationsRun: false,
    migrationsTableName: 'typeorm_migrations',
    namingStrategy: new SnakeNamingStrategy(),
};

export const typeOrmConfig = {
    imports: [],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        ...dataSourceOptions,
    }),
    dataSourceFactory: async (options: DataSourceOptions) => {
        return addTransactionalDataSource(new DataSource(options));
    },
};

export default new DataSource(dataSourceOptions);
