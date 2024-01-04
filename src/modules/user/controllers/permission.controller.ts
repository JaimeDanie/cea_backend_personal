import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { Role } from '../entities/role.entity';
import { UpdateRoleDto } from '../dtos/updateRole.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionService } from '../services/permission.service';
import { Permission } from '../entities/permission.entity';
import { ResponsePermissionDto } from '../dtos/responsePermission.dto';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permisionService: PermissionService) {}

  @Get()
  index(): Promise<Permission[]> {
    return this.permisionService.getPermissions();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Permission> {
    const role = await this.permisionService.getPermission(id);
    return role ? role : ({} as Permission);
  }

  @Post()
  create(@Body() permision: CreateRoleDto): Promise<ResponsePermissionDto> {
    return this.permisionService.createPermission(permision);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: string): Promise<ResponsePermissionDto> {
    return this.permisionService.deletePermission(id);
  }
}
