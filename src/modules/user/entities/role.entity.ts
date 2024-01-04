import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];

  @ManyToMany((type) => Permission, (permission) => permission.roles, {
    eager: true,
  })
  @JoinTable()
  permission: Permission[];
}
