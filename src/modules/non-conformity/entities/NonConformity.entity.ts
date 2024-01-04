import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'non-conformity' })
export class NonConformity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
}
