import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'productos' })
export class Product {
  @PrimaryColumn()
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  characteristiclote?: string;
}
