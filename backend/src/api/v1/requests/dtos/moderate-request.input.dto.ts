import { ApiProperty } from '@nestjs/swagger';
import { RequestStatusEnum } from 'src/shared/enum';

export class ModerateRequestInputDto {
    @ApiProperty({
        title: 'Статус',
        enum: RequestStatusEnum,
    })
    status: RequestStatusEnum;
}
