import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NonConformity } from '../entities/NonConformity.entity';
import { Repository } from 'typeorm';
import { NonConformityDto } from '../dtos/non-conformity.dto';

@Injectable()
export class NonConformityService {
  constructor(
    @InjectRepository(NonConformity)
    private nonConformityRepository: Repository<NonConformity>,
  ) { }

  getAll(): Promise<NonConformity[]> {
    return this.nonConformityRepository.find();
  }

  getByName(nonConformityDto: NonConformityDto): Promise<NonConformity> {
    return this.nonConformityRepository.findOne({
      where: { name: nonConformityDto.name },
    });
  }

  getById(id: string): Promise<NonConformity> {
    return this.nonConformityRepository.findOne({
      where: { id },
    });
  }

  async saveNonConformity(
    nonConformityDto: NonConformityDto,
  ) {
    const exist = await this.getByName(nonConformityDto);
    if (!exist) {
      const saveStatus = await this.nonConformityRepository.save(nonConformityDto);
      return { success: true, data: saveStatus };
    }
    return { success: false, message: "No se puede crear no conformidad" };
  }
}
