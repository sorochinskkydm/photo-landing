import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from 'src/infra/postgres/entities';
import { Repository } from 'typeorm';
import { CreateRequestInputDto } from './dtos';
import { ModerateRequestInputDto } from './dtos/moderate-request.input.dto';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly repo: Repository<RequestEntity>,
    ) {}

    public async create(dto: CreateRequestInputDto): Promise<RequestEntity> {
        const { date } = dto;
        const requests = await this.repo.find({ where: { date } });
        if (requests.length) throw new BadRequestException('Заявка с такой датой уже существует');
        return this.repo.create({ ...dto });
    }

    public async moderate(id: string, { status }: ModerateRequestInputDto): Promise<boolean> {
        const request = await this.repo.findOne({ where: { id } });
        if (!request) throw new BadRequestException('Заявка не найдена');
        const result = await this.repo.update({ id }, { status });
        return result.affected === 1;
    }

    public async getAvailableHours(date: Date) {
        const requests = await this.repo.find({ where: { date }, select: ['id', 'date', 'hours'] });
    }
}
