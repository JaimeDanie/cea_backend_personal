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
  sello?: string;

  @Column({ nullable: true })
  lotebolsa?: string;

  @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
  weight?: number;

  @Column({ nullable: true })
  novedad?: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @Column({ nullable: false, default: 0 })
  print: number;

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
