import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filler } from '../entities/filler.entities';
import { Repository } from 'typeorm';
import { FillerDto } from '../dto/filler.dto';
import { TubularService } from 'src/modules/tubular/services/tubular.service';

@Injectable()
export class FillerService {
  constructor(
    @InjectRepository(Filler) private fillerRepository: Repository<Filler>,
  ) { }

  getFillers(): Promise<Filler[]> {
    return this.fillerRepository.manager.find(Filler, {});
  }

  getFiller(id: string): Promise<Filler> {
    return this.fillerRepository.findOne({ where: { id } });
  }

  async createFiller(filler: FillerDto) {
    const fillerFound = await this.getFillerValid(filler.filler);
    if (!fillerFound) {
      const newFiller = { ...filler };
      const fillerSave = await this.fillerRepository.save(newFiller);
      return { success: true, data: fillerSave };
    }
    return { success: false, message: "No se pudo crear llenadora" };
  }

  async updateFiller(id: string, filler: FillerDto) {
    if (
      (await this.getFiller(id))
    ) {
      await this.fillerRepository.update(id, filler);
      return { success: true, message: "LLenadora actualizada correctamente" }
    }
    return { success: false, message: "Llenadora no existe" }
  }

  async deleteFiller(id: string) {
    try {
      if (await this.getFiller(id)) {
        await this.fillerRepository.delete(id);
        return { success: true, message: "Llenadora eliminada correctamente" }
      }
      return { success: false, message: "Llenadora no existe" }
    } catch (error) {
      return { success: false, message: "Llenadora asignada, no se puede eliminar" }
    }

  }

  async getFillerValid(filler: string): Promise<Filler> {
    const fillerFound = await this.fillerRepository.findOne({
      where: { filler },
    });

    return fillerFound;
  }
}
