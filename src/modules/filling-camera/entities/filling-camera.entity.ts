import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'filling-camera' })
export class FillingCamera {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  status: string;
}
