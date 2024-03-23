import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FilligCameraService } from '../services/fillig-camera.service';
import { FillingCamera } from '../entities/filling-camera.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilligCameraDto } from '../dtos/filling-camera.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Cámara de llenado')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('fillig-camera')
export class FilligCameraController {
  constructor(private fillingCameraService: FilligCameraService) { }

  @Get()
  getAll(): Promise<FillingCamera[]> {
    return this.fillingCameraService.getAll();
  }

  @Post()
  createFillig(@Body() filligCamera: FilligCameraDto) {
    return this.fillingCameraService.createFilligCamera(filligCamera);
  }

  @Put('update-status/:id')
  updateStatusFillig(@Param('id') id: string) {
    return this.fillingCameraService.updateStatusFilligCamera(id);
  }

  @Put("/:id")
  updateFillig(@Param('id') id: string, @Body() filligCamera: FilligCameraDto) {
    return this.fillingCameraService.updateCamera(id, filligCamera);
  }
}
