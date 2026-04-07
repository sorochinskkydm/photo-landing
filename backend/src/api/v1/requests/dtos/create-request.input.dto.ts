import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestInputDto {
    @ApiProperty({
        title: 'Имя',
        example: 'Дарья',
    })
    name: string;

    @ApiProperty({
        title: 'Фамилия',
        example: 'Иванова',
    })
    surname: string;

    @ApiProperty({
        title: 'Отчество',
        example: 'Ивановна',
    })
    patronymic: string;

    @ApiProperty({
        title: 'Дата',
        example: '2023-01-01',
    })
    date: Date;

    @ApiProperty({
        title: 'Количество человек',
        example: 2,
    })
    countOfPeople: number;
}
