import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FillingCamera } from '../entities/filling-camera.entity';
import {
  FilligCameraDto,
  FillingCameraStatusEnum,
} from '../dtos/filling-camera.dto';

@Injectable()
export class FilligCameraService {
  constructor(
    @InjectRepository(FillingCamera)
    private filligCameraRepository: Repository<FillingCamera>,
  ) {}

  getAll(): Promise<FillingCamera[]> {
    return this.filligCameraRepository.find({});
  }

  existByName(filligCamera: FilligCameraDto): Promise<FillingCamera> {
    return this.filligCameraRepository.findOne({
      where: { name: filligCamera.name },
    });
  }

  async createFilligCamera(
    filligCamera: FilligCameraDto,
  ): Promise<FillingCamera> {
    const exist = await this.existByName(filligCamera);

    if (!exist) {
      const newFilligCamera = {
        ...filligCamera,
        status: FillingCameraStatusEnum.ACTIVO,
      };
      return this.filligCameraRepository.save(newFilligCamera);
    }
    return null;
  }

  async updateStatusFilligCamera(id: string): Promise<FillingCamera> {
    const exist = await this.findByid(id);
    if (exist) {
      const newStatus =
        exist.status === FillingCameraStatusEnum.ACTIVO
          ? FillingCameraStatusEnum.BLOQUEADO
          : FillingCameraStatusEnum.ACTIVO;
      const newFillig = { ...exist, status: newStatus };
      this.filligCameraRepository.update(id, newFillig);
      return newFillig;
    }
    return null;
  }

  findByid(id: string): Promise<FillingCamera> {
    return this.filligCameraRepository.findOne({
      where: { id },
    });
  }
}
