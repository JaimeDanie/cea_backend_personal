import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
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
  ) { }

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
  ) {
    const exist = await this.existByName(filligCamera);

    if (!exist) {
      const newFilligCamera = {
        ...filligCamera,
        status: FillingCameraStatusEnum.ACTIVO,
      };
      const filligSave = await this.filligCameraRepository.save(newFilligCamera);
      return { success: true, data: filligSave };
    }
    return { success: false, message: "Error al crear cámara de llenado" };
  }

  async updateStatusFilligCamera(id: string) {
    const exist = await this.findByid(id);
    if (exist) {
      const newStatus =
        exist.status === FillingCameraStatusEnum.ACTIVO
          ? FillingCameraStatusEnum.BLOQUEADO
          : FillingCameraStatusEnum.ACTIVO;
      const newFillig = { ...exist, status: newStatus };
      this.filligCameraRepository.update(id, newFillig);
      return { success: true, data: newFillig };
    }
    return { success: false, message: "No se pudo actualizar cámara de llenado" };
  }

  findByid(id: string): Promise<FillingCamera> {
    return this.filligCameraRepository.findOne({
      where: { id },
    });
  }

  otherCameraByName(filligCameraName: string): Promise<FillingCamera> {
    return this.filligCameraRepository.findOne({
      where: { name: Not(filligCameraName) },
    });
  }

  async updateCamera(id: string, fillingCameraDto: FilligCameraDto) {
    try {
      const existCamera = await this.findByid(id)
      if (!existCamera) {
        return { success: false, message: "No exist filling camera" }
      }

      await this.filligCameraRepository.update(id, { name: fillingCameraDto.name })
      return { success: true, message: "update succesfully" }
    } catch (error) {
      return { success: false, message: "Exception to update" }
    }

  }
}
