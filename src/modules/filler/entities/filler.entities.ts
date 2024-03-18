import { Tubular } from './../../tubular/entities/tubular.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'filler' })
export class Filler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  filler: string;
}
