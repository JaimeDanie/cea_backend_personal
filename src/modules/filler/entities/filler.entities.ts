import { Tubular } from './../../tubular/entities/tubular.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'filler' })
export class Filler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  filler: number;

  @OneToOne(() => Tubular)
  @JoinColumn({ name: 'tubullar', referencedColumnName: 'id' })
  tubullar: Tubular;
}
