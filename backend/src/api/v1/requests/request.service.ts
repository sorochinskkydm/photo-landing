import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from 'src/infra/postgres/entities';
import { Repository } from 'typeorm';
import { CreateRequestInputDto, ModerateRequestInputDto } from './dtos';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly repo: Repository<RequestEntity>,
    ) {}

    public create(dto: CreateRequestInputDto): Promise<RequestEntity> {
        const entity = this.repo.create({
            ...dto,
            date: new Date(dto.date),
        });
        return this.repo.save(entity);
    }

    public findAll(): Promise<RequestEntity[]> {
        return this.repo.find({ order: { createdAt: 'DESC' } });
    }

    public async moderate(
        id: string,
        { status }: ModerateRequestInputDto,
    ): Promise<RequestEntity> {
        const request = await this.repo.findOne({ where: { id } });
        if (!request) {
            throw new NotFoundException('Заявка не найдена');
        }
        request.status = status;
        return this.repo.save(request);
    }
}
