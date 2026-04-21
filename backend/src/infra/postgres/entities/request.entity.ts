import { RequestStatusEnum } from 'src/shared/enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('requests')
export class RequestEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    phone: string;

    @Column({ type: 'timestamptz' })
    date: Date;

    @Column({ type: 'text', nullable: true })
    comment: string | null;

    @Column({
        type: 'enum',
        enum: RequestStatusEnum,
        default: RequestStatusEnum.PENDING,
    })
    status: RequestStatusEnum;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
