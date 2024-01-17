import { Permission } from 'src/modules/user/entities/permission.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { UpdateRoleDto } from '../dtos/updateRole.dto';
import { ResponsePermissionDto } from '../dtos/responsePermission.dto';

const CRUD_PERMISSION = ['CREATE', 'DELETE', 'UPDATE', 'READ-ONE', 'READ-ALL'];
const MODULES_PERMISSION = ['USER', 'ORDER'];

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.find({});
  }

  async getPermission(id: string): Promise<Permission> {
    return this.permissionRepository.findOneBy({ id });
  }

  async createPermission(
    permission: CreateRoleDto,
  ): Promise<ResponsePermissionDto> {
    const response = new ResponsePermissionDto();
    response.data = null;
    response.success = false;
    const existingPermission: Permission =
      await this.permissionRepository.findOneBy({
        name: permission.name,
      });

    if (existingPermission) {
      response.message = 'already exist permission';
      return response;
    }
    const namePermission = permission.name.split('_');
    const isValidNamePermision = namePermission.length > 1;

    if (!isValidNamePermision) {
      response.message = 'not valid name permission';
      return response;
    }

    if (!CRUD_PERMISSION.includes(namePermission[0])) {
      response.message = 'not valid name permission';
      return response;
    }

    if (!MODULES_PERMISSION.includes(namePermission[1])) {
      response.message = 'not valid module';
      return response;
    }

    const createResult = await this.permissionRepository.save(permission);
    response.success = true;
    response.message = null;
    response.data = createResult;
    return response;
  }

  async deletePermission(id: string): Promise<ResponsePermissionDto> {
    const response = new ResponsePermissionDto();
    response.data = null;
    response.success = false;
    try {
      const permissionFound = this.getPermission(id);
      if (!permissionFound) {
        response.message = 'Permission no exist';
        return response;
      }

      await this.permissionRepository.delete(id);
      response.success = true;
      response.message = 'Deleted succesfully';
      return response;
    } catch (error) {
      console.log('EXCEPTION==>', error);
      response.message = 'Exception to deleted permission';
      return response;
    }
  }
}
