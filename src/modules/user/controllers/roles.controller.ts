import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { Role } from '../entities/role.entity';
import { UpdateRoleDto } from '../dtos/updateRole.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssignedPermissionDto } from '../dtos/assignedRole.dto';
import { ResponsePermissionDto } from '../dtos/responsePermission.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly roleService: RoleService) { }

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
  create(@Body() role: CreateRoleDto) {
    return this.roleService.createRole(role);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateRoleDto) {
    return this.roleService.updateRole(id, body);
  }

  @Post('assignedPermission/:id')
  asignedPermissionToRole(
    @Param('id') idRole: string,
    @Body() assignedPermissionToRole: AssignedPermissionDto,
  ): Promise<ResponsePermissionDto> {
    return this.roleService.assignedPermissionToRole(
      idRole,
      assignedPermissionToRole.idPermission,
    );
  }

  @Post('unassignedPermission/:id')
  deletePermissionToRole(
    @Param('id') idRole: string,
    @Body() assignedPermissionToRole: AssignedPermissionDto,
  ): Promise<ResponsePermissionDto> {
    return this.roleService.assignedPermissionToRole(
      idRole,
      assignedPermissionToRole.idPermission,
      true,
    );
  }
}
