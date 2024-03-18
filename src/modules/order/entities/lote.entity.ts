import { NonConformity } from './../../non-conformity/entities/NonConformity.entity';
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'lote' })
export class Lote {

    @PrimaryColumn()
    numlote: number;

    @ManyToOne(() => NonConformity, { nullable: true })
    @JoinColumn({ name: 'nonconformity', referencedColumnName: 'id' })
    status?: NonConformity;

    @CreateDateColumn()
    createdat: Date;

    @UpdateDateColumn()
    updatedat: Date;
}