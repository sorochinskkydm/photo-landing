import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from 'src/infra/postgres/entities';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
    imports: [TypeOrmModule.forFeature([RequestEntity])],
    controllers: [RequestController],
    providers: [RequestService],
    exports: [RequestService],
})
export class RequestModule {}
