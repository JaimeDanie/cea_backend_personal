import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'nonconformity' })
export class NonConformity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
}
