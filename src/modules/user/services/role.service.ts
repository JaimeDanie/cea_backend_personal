import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';

import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { UpdateRoleDto } from '../dtos/updateRole.dto';
import { AppDataSource } from 'data-source';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getRoles(): Promise<Role[]> {
    return await AppDataSource.manager.find(Role);
  }

  async getRole(id: string): Promise<Role> {
    return await AppDataSource.manager.findOne(Role, { where: { id } });
  }

  async createRole(role: CreateRoleDto): Promise<Role> {
    const existingRole: Role = await AppDataSource.manager.findOne(Role, {
      where: { name: role.name },
    });

    if (existingRole) {
      throw new HttpException(
        'Role name is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createResult = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Role)
      .values(role)
      .execute();

    const result = await AppDataSource.manager.findOne(Role, {
      where: { id: createResult.identifiers[0].id },
    });

    return result;
  }

  async updateRole(id: string, role: UpdateRoleDto): Promise<Role> {
    try {
      const updateResult = await AppDataSource.createQueryBuilder()
        .update(Role)
        .set({ ...role })
        .where('id = :id', { id })
        .execute();
      const result = await AppDataSource.manager.findOne(Role, {
        where: { id },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
