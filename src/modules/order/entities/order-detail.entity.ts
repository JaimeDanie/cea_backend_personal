import { NonConformity } from './../../non-conformity/entities/NonConformity.entity';
import { FillingCamera } from './../../filling-camera/entities/filling-camera.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'orderdetail' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  serial: string;

  @Column({ nullable: false })
  lote: string;

  @Column({ nullable: true, default: 0 })
  numtambor?: number;

  @Column({ nullable: true })
  datefilling: string;

  @Column({ nullable: true })
  duration?: string;

  @Column({ nullable: true })
  sello?: number;

  @Column({ nullable: true })
  lotebolsa?: number;

  @Column({ nullable: true })
  weight?: number;

  @Column({ nullable: true })
  novedad?: string;

  @Column({ nullable: false })
  status_tambor: string;

  @Column({ nullable: true })
  novedad_tambor?: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @ManyToOne(() => FillingCamera)
  @JoinColumn({ name: 'filligcamera', referencedColumnName: 'id' })
  filligcamera: FillingCamera;

  @ManyToOne(() => NonConformity, { nullable: true })
  @JoinColumn({ name: 'nonconformity', referencedColumnName: 'id' })
  status?: NonConformity;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order', referencedColumnName: 'id' })
  order: Order;
}
