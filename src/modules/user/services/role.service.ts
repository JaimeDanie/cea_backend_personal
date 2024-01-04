import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from './../../../database/data-source';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Role } from '../entities/role.entity';

import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { UpdateRoleDto } from '../dtos/updateRole.dto';
import { Permission } from '../entities/permission.entity';
import { ResponsePermissionDto } from '../dtos/responsePermission.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
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

  async assignedPermissionToRole(
    idRole: string,
    idPermission: string,
    remove = false,
  ): Promise<ResponsePermissionDto> {
    const response = new ResponsePermissionDto();
    response.success = false;
    response.data = null;

    try {
      const existRole = await AppDataSource.manager.findOne(Role, {
        where: { id: idRole },
        relations: ['permission'],
      });

      if (!existRole) {
        response.message = 'Role no exists';
        return response;
      }

      const existPermission = await this.permissionRepository.findOne({
        where: { id: idPermission },
      });

      if (!existPermission) {
        response.message = 'Permission no exists';
        return response;
      }

      if (
        !remove &&
        existRole.permission.find((perm) => perm.id == idPermission)
      ) {
        response.message = 'Permission already assigned';
        return response;
      }

      existRole.permission.push(existPermission);
      if (!remove) {
        await AppDataSource.createQueryBuilder()
          .relation(Role, 'permission')
          .of(existRole)
          .add(existPermission);
      } else {
        await AppDataSource.createQueryBuilder()
          .relation(Role, 'permission')
          .of(existRole)
          .remove(existPermission);
      }

      response.success = true;
      response.message = !remove
        ? 'Permission assigned succesfully'
        : 'Permission unassigned succesfully';
      return response;
    } catch (error) {
      response.message = 'Exception to assigned permission';
      return response;
    }
  }
}
