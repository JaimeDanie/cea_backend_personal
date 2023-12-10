import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  firstName: string

  @Column({ nullable: false })
  lastName: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true })
  currentToken: string;

  @Column({ default: true })
  isActive: boolean

  @Column({ default: false })
  isAdmin: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

}