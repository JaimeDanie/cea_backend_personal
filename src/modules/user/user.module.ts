import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { Role } from './entities/role.entity';
import { RolesController } from './controllers/roles.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [ TypeOrmModule.forFeature([User, Role]) ],
  controllers: [ 
    UsersController,
    RolesController
  ],
  providers: [
    UserService,
    RoleService
  ],
  exports: [
    UserService,
    RoleService
  ],
})
export class UserModule {}
