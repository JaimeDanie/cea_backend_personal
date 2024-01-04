import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create.dto';
import { UpdateUserDto } from '../dtos/update.dto';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from '../dtos/responsePermission.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }

  @Get('byEmail/:email')
  getByEmail(@Param('email') email: string): Promise<ResponseUserDto> {
    return this.userService.getUserByEmail(email);
  }
}
