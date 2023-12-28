import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { Role } from '../entities/role.entity';
import { UpdateRoleDto } from '../dtos/updateRole.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  index(): Promise<Role[]> {
    return this.roleService.getRoles();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Role> {
    const role = await this.roleService.getRole(id);
    return role ? role : ({} as Role);
  }

  @Post()
  create(@Body() role: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateRoleDto): Promise<Role> {
    return this.roleService.updateRole(id, body);
  }
}
