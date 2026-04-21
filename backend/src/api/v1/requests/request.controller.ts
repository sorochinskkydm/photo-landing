import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRequestInputDto, ModerateRequestInputDto } from './dtos';
import { RequestService } from './request.service';

@ApiTags('Заявки')
@Controller({ path: 'requests', version: '1' })
export class RequestController {
    constructor(private readonly requestService: RequestService) {}

    @ApiOperation({ summary: 'Создание заявки с лендинга' })
    @Post()
    create(@Body() dto: CreateRequestInputDto) {
        return this.requestService.create(dto);
    }

    @ApiOperation({ summary: 'Список заявок (админ-панель)' })
    @Get()
    findAll() {
        return this.requestService.findAll();
    }

    @ApiOperation({ summary: 'Смена статуса заявки' })
    @Patch(':id/status')
    moderate(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: ModerateRequestInputDto,
    ) {
        return this.requestService.moderate(id, dto);
    }
}
