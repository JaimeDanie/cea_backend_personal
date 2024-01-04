import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FilligCameraService } from '../services/fillig-camera.service';
import { FillingCamera } from '../entities/filling-camera.entity';
import { ApiTags } from '@nestjs/swagger';
import { FilligCameraDto } from '../dtos/filling-camera.dto';

@ApiTags('Cámara de llenado')
@Controller('fillig-camera')
export class FilligCameraController {
  constructor(private fillingCameraService: FilligCameraService) {}

  @Get()
  getAll(): Promise<FillingCamera[]> {
    return this.fillingCameraService.getAll();
  }

  @Post()
  createFillig(@Body() filligCamera: FilligCameraDto): Promise<FillingCamera> {
    return this.fillingCameraService.createFilligCamera(filligCamera);
  }

  @Put('update-status/:id')
  updateStatusFillig(@Param('id') id: string): Promise<FillingCamera> {
    return this.fillingCameraService.updateStatusFilligCamera(id);
  }
}
