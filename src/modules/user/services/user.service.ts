import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "../dtos/create.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from "../dtos/update.dto";

import { AppDataSource } from "src/database/data-source";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async getUsers(): Promise<User[]> {
    return await AppDataSource.manager.find(User, {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        isAdmin: true, 
        currentToken: true,
        createdAt: true,
        updatedAt: true
      },
      // where: {
      //   isActive: true
      // }
    })
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
        currentToken: true, 
        createdAt: true,
        updatedAt: true
      },
      where: { id }
    })
  }

  async createUser(user: CreateUserDto): Promise<any> {
    try {
      const { email } = user
      const existingUser: User = await AppDataSource.manager.findOne(User, { where: { email } })
  
      if (existingUser) {
        throw new HttpException(
          'Email is already taken',
          HttpStatus.BAD_REQUEST
        )
      }
      const createResult = await AppDataSource.createQueryBuilder().insert().into(User).values([
        { 
          firstName: user.firstName,
          lastName: user.lastName, 
          email: user.email,           
          password: await this.hashPassword(user.password),
          isActive: user.isActive
        }
      ]).execute()
  
      const { password, ...result } = await AppDataSource.manager.findOne(User, { where: { id: createResult.identifiers[0].id }})
  
      return result      
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateUser(id: string, body: UpdateUserDto): Promise<any> {
    try {
      const updateBody = { ...body }

      if(updateBody.hasOwnProperty("password") && (updateBody.password.length > 0 && updateBody.password.length < 6)){
        throw new Error('password must be less than 6 characters')
      }

      if(updateBody.hasOwnProperty("password") && updateBody.password.length === 0){
        delete updateBody.password
      }

      if(updateBody.hasOwnProperty("password") && updateBody.password.length >= 6) {
        updateBody.password = await this.hashPassword(updateBody.password)
      }

      const updateResult = await AppDataSource.createQueryBuilder().update(User).set({...updateBody}).where("id = :id", { id }).execute()
      const { password, ...result } = await AppDataSource.manager.findOne(User, { where: { id }})

      return result 
    } catch (error) {
      throw new Error(error)
    }
  }

  async updatePassword(id: string, password: string): Promise<UpdateResult | undefined> {
    try {
      return await this.userRepository.update(id, {
        password: await this.hashPassword(password)
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      const deleteResult = AppDataSource.createQueryBuilder().update(User).set({ currentToken: null, isActive: false }).where("id = :id", { id }).execute()
      return deleteResult
    } catch (error) {
      throw new Error(error)
    }
  }


  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }
}