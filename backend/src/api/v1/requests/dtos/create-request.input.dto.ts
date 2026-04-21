import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateRequestInputDto {
    @ApiProperty({ example: 'Дарья', description: 'Имя клиента' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @ApiProperty({ example: 'Иванова', description: 'Фамилия клиента' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    surname: string;

    @ApiProperty({ example: '+79991234567', description: 'Телефон для связи' })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
        message: 'Некорректный формат телефона',
    })
    phone: string;

    @ApiProperty({
        example: '2026-05-01T12:00:00.000Z',
        description: 'Желаемая дата съёмки (ISO 8601)',
    })
    @IsDateString()
    date: string;

    @ApiProperty({
        required: false,
        example: 'Хочу семейную фотосессию',
        description: 'Комментарий',
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    comment?: string;
}
