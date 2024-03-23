import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operate } from '../entities/operate.entity';
import { Repository } from 'typeorm';
import { OperateDto } from '../dtos/operate.dto';

@Injectable()
export class OperateService {
  constructor(
    @InjectRepository(Operate) private operateRepository: Repository<Operate>,
  ) { }

  getAll(): Promise<Operate[]> {
    return this.operateRepository.find();
  }

  async create(operate: OperateDto) {
    try {
      const operateSave = await this.operateRepository.save(operate);
      return { success: true, data: operateSave };
    } catch (error) {
      return { success: false, message: "No se puede guardar operador" };
    }

  }

  getOne(id: string): Promise<Operate> {
    return this.operateRepository.findOne({ where: { id } });
  }
}
