import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from 'src/infra/postgres/entities';
import { RequestService } from './request.service';
import { RequestController } from './requst.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RequestEntity])],
    controllers: [RequestController],
    providers: [RequestService],
    exports: [RequestService],
})
export class RequestModule {}
