import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "../dtos/create.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from "../dtos/update.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository.findOne({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true
      },
      where: { id }
    })
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    })
  }

  async createUser(user: CreateUserDto): Promise<any> {
    const { email } = user
    const existingUser: User = await this.userRepository.findOne({ where: { email } })

    if (existingUser) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.BAD_REQUEST
      )
    }
    const createdUser: User = this.userRepository.create(user)

    createdUser.password = await this.hashPassword(createdUser.password)
    const { password, ...result } = await this.userRepository.save(createdUser)
    return result
  }

  async updateUser(id: string, body: UpdateUserDto): Promise<any> {
    try {
      const updateUser: User = await this.userRepository.findOne({ where: { id } })
      if (body.password !== undefined) {
        updateUser.password = await this.hashPassword(updateUser.password)
      }
      const { password, ...result } = await this.userRepository.save(updateUser)
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

  async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      return await this.userRepository.delete(id)
    } catch (error) {
      throw new Error(error)
    }
  }


  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }
}