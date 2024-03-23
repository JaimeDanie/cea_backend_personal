import { AppDataSource } from './../../../database/data-source';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dtos/create.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dtos/update.dto';
import { ResponseUserDto } from '../dtos/responsePermission.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async getUsers(): Promise<User[]> {
    let users = await AppDataSource.manager.find(User, {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        isAdmin: true,
        roles: {
          name: true,
        },
        currentToken: false,
        createdAt: true,
        updatedAt: true,
      },
      relations: {
        roles: true,
      },
    });
    users = users.map((user) => {
      return {
        ...user,
        roles: user.roles
          .map((rol) => {
            if (rol.id !== null) {
              return {
                ...rol,
                name: rol.name[0],
              };
            }
          })
          .filter((role) => role != null),
      };
    });
    return users;
  }

  async getUser(id: string): Promise<User> {
    return await AppDataSource.manager.findOne(User, {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        isAdmin: true,
        roles: true,
        recoveryHashPassword: true,
        currentToken: false,
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
      relations: {
        roles: true,
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<any> {
    const { email } = user;
    const existingUser: User = await AppDataSource.manager.findOne(User, {
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
    }

    try {
      const userCreated = AppDataSource.manager.create(User, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: await this.hashPassword(user.password),
        roles: user.roles,
        isActive: user.isActive,
        isAdmin: user.isAdmin,
      });

      const { password, ...result } = await AppDataSource.manager.save(
        userCreated,
      );

      return { success: true, data: result };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: string, body: UpdateUserDto): Promise<any> {
    try {
      const updateBody = { ...body };

      if (
        updateBody.hasOwnProperty('password') &&
        updateBody?.password?.length > 0 &&
        updateBody?.password?.length < 6
      ) {
        throw new Error('password must be less than 6 characters');
      }

      if (
        updateBody.hasOwnProperty('password') &&
        updateBody?.password?.length === 0
      ) {
        delete updateBody.password;
      }

      const existingUser: User = await AppDataSource.manager.findOne(User, {
        where: { id },
        relations: { roles: true },
      });

      if (
        updateBody.hasOwnProperty('password') &&
        updateBody?.password?.length >= 6
      ) {
        updateBody.password = await this.hashPassword(updateBody.password);
      }

      updateBody.hasOwnProperty('firstName')
        ? (existingUser.firstName = updateBody.firstName)
        : undefined;
      updateBody.hasOwnProperty('lastName')
        ? (existingUser.lastName = updateBody.lastName)
        : undefined;
      updateBody.hasOwnProperty('password')
        ? (existingUser.password = updateBody.password)
        : undefined;
      updateBody.hasOwnProperty('isActive')
        ? (existingUser.isActive = updateBody.isActive)
        : undefined;
      updateBody.hasOwnProperty('isAdmin')
        ? (existingUser.isAdmin = updateBody.isAdmin)
        : undefined;
      const existRoles = []
      if (updateBody.hasOwnProperty('roles')) {
        const roles = updateBody.roles
        await Promise.all(roles.map(async (rol) => {
          const role = await AppDataSource.manager.findOne(Role, {
            where: { id: rol }
          });
          existRoles.push(role)
        }));
        const exists = existRoles.filter((role) => role === null)
        if (exists.length > 0) {
          return { success: false, message: "role no exist" }
        }

        existingUser.roles = existRoles
      }


      const { password, ...result } = await AppDataSource.manager.save(
        existingUser,
      );
      return result;
    } catch (error) {
      console.log("ERROR==>", error)
      throw new Error(error);
    }
  }

  async updatePassword(
    id: string,
    password: string,
  ): Promise<User | undefined> {
    try {
      const user = await AppDataSource.manager.findOne(User, {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          isActive: true,
          isAdmin: true,
          roles: true,
          currentToken: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { id },
        relations: {
          roles: true,
        },
      });
      user.password = await this.hashPassword(password);
      user.recoveryHashPassword = null;
      return AppDataSource.manager.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      const deleteResult = AppDataSource.createQueryBuilder()
        .update(User)
        .set({ currentToken: null, isActive: false })
        .where('id = :id', { id })
        .execute();
      return deleteResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async getUserByEmail(email: string): Promise<ResponseUserDto> {
    const responseUserDto = new ResponseUserDto();
    responseUserDto.data = null;
    responseUserDto.success = false;
    responseUserDto.message = 'user not foind';
    responseUserDto.data = await AppDataSource.manager.findOne(User, {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        isAdmin: true,
        roles: true,
        currentToken: false,
        createdAt: true,
        updatedAt: true,
      },
      where: { email },
      relations: {
        roles: true,
      },
    });
    if (responseUserDto.data) {
      responseUserDto.success = true;
      responseUserDto.message = null;
      return responseUserDto;
    }
    return responseUserDto;
  }

  async getUserByRecovery(hashRecovery: string): Promise<User> {
    return await AppDataSource.manager.findOne(User, {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        isAdmin: true,
        roles: true,
        currentToken: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { recoveryHashPassword: hashRecovery },
      relations: {
        roles: true,
      },
    });
  }
}
