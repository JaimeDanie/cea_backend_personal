import { Tubular } from './../../tubular/entities/tubular.entity';
import { Filler } from './../../filler/entities/filler.entities';

import { Operate } from './../../operate/entities/operate.entity';

import { Product } from './../../products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shift } from './shift.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  saporder: string;

  @Column({ nullable: true })
  numorder?: number;

  @Column({ nullable: false, default: 0 })
  shiftclosing?: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product', referencedColumnName: 'code' })
  product: Product;

  @ManyToOne(() => Filler)
  @JoinColumn({ name: 'filler', referencedColumnName: 'id' })
  filler: Filler;

  @ManyToOne(() => Operate)
  @JoinColumn({ name: 'operate', referencedColumnName: 'id' })
  operate: Operate;

  @ManyToOne(() => Operate, { nullable: true })
  @JoinColumn({ name: 'supervisor', referencedColumnName: 'id' })
  supervisor: Operate;

  @ManyToOne(() => Tubular)
  @JoinColumn({ name: 'tubular', referencedColumnName: 'id' })
  tubular: Tubular;

  @ManyToOne(() => Shift, { nullable: true })
  @JoinColumn({ name: 'turno', referencedColumnName: 'id' })
  turno: Shift;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
