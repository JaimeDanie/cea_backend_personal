import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operate } from '../entities/operate.entity';
import { Repository } from 'typeorm';
import { OperateDto } from '../dtos/operate.dto';

@Injectable()
export class OperateService {
  constructor(
    @InjectRepository(Operate) private operateRepository: Repository<Operate>,
  ) {}

  getAll(): Promise<Operate[]> {
    return this.operateRepository.find();
  }

  create(operate: OperateDto): Promise<Operate> {
    return this.operateRepository.save(operate);
  }

  getOne(id: string): Promise<Operate> {
    return this.operateRepository.findOne({ where: { id } });
  }
}
