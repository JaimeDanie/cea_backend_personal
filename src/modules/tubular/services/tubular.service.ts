import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tubular } from '../entities/tubular.entity';
import { Repository } from 'typeorm';
import { TubularDto } from '../dtos/tubular.dto';

@Injectable()
export class TubularService {
  constructor(
    @InjectRepository(Tubular) private tubularRepository: Repository<Tubular>,
  ) { }

  getAll(): Promise<Tubular[]> {
    return this.tubularRepository.find();
  }

  getByName(tubular: TubularDto): Promise<Tubular> {
    return this.tubularRepository.findOne({
      where: { name: tubular.name.toString() },
    });
  }

  async createTubular(tubular: TubularDto) {
    if (!(await this.getByName(tubular))) {
      const newTubular = { name: tubular.name.toString() };
      const tubularSave = await this.tubularRepository.save(newTubular);
      return { success: true, data: tubularSave };
    }
    return { success: false, message: "Error al crear tubular" };
  }

  getById(id: string): Promise<Tubular> {
    return this.tubularRepository.findOne({
      where: { id },
    });
  }

  async updateTubular(id: string, tubular: TubularDto) {
    try {
      const existTubular = await this.getById(id)
      if (existTubular) {
        existTubular.name = tubular.name.toString()
        await this.tubularRepository.update(id, existTubular)
        return { success: true, message: "update sucessfully" }
      } else {
        return { success: false, message: "no exist tubullar" }
      }

    } catch (error) {
      return { success: false, message: "no exist tubullar" }
    }
  }

  async deleteTubular(id: string) {
    try {
      const existTubular = await this.getById(id)
      if (existTubular) {
        await this.tubularRepository.delete(id)
        return { success: true, message: "deleted sucessfully" }
      } else {
        return { success: false, message: "tubular no existe" }
      }

    } catch (error) {
      return { success: false, message: "tubular ha sido asignada no se puede eliminar" }
    }
  }

}
