import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tubular } from '../entities/tubular.entity';
import { Repository } from 'typeorm';
import { TubularDto } from '../dtos/tubular.dto';

@Injectable()
export class TubularService {
  constructor(
    @InjectRepository(Tubular) private tubularRepository: Repository<Tubular>,
  ) {}

  getAll(): Promise<Tubular[]> {
    return this.tubularRepository.find();
  }

  getByName(tubular: TubularDto): Promise<Tubular> {
    return this.tubularRepository.findOne({
      where: { name: tubular.name.toString() },
    });
  }

  async createTubular(tubular: TubularDto): Promise<Tubular> {
    if (!(await this.getByName(tubular))) {
      const newTubular = { name: tubular.name.toString() };
      return this.tubularRepository.save(newTubular);
    }
    return null;
  }

  getById(id: string): Promise<Tubular> {
    return this.tubularRepository.findOne({
      where: { id },
    });
  }
}
