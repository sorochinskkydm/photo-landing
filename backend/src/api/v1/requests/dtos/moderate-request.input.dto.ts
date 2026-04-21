import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RequestStatusEnum } from 'src/shared/enum';

export class ModerateRequestInputDto {
    @ApiProperty({ enum: RequestStatusEnum, description: 'Новый статус заявки' })
    @IsEnum(RequestStatusEnum)
    status: RequestStatusEnum;
}
