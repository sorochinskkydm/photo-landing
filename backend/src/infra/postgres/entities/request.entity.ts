import { RequestStatusEnum } from 'src/shared/enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('requests')
export class RequestEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    surname: string;

    @Column({})
    name: string;

    @Column({ nullable: true })
    patronymic: string;

    @Column({ type: 'date' })
    date: Date;

    @Column()
    hours: number;

    @Column({ type: 'enum', enum: RequestStatusEnum, default: RequestStatusEnum.PENDING })
    status: RequestStatusEnum;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
